'use client';

import { InstallmentsAPICalls } from "@/api-calls/installments-api-calls";
import { token } from "@/components/Atoms/token";
import { Grid, Table, Title } from "@mantine/core"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ReportStudentInfo {
  class_fee: number,
  class_fee_currency: string,
  class_name: string,
  installment_amount: number,
  installment_date: string,
  installment_id: string,
  installment_received: false,
  installment_type: string,
  instructor_name: string,
  start_date: string,
  start_time: string,
  student_id: string,
  student_fathername: string,
  student_name: string,
  student_phone_number: string,
}

interface ReportData {
  remained_installments_list: ReportStudentInfo[]
  students: number,
  received_installments_amount: number,
  remained_installments_amount: number,
  remained_installments_count: number,
  received_installments: number,
  remained_installments: number,
}

const Report = () => {

  const installmentsAPI = new InstallmentsAPICalls(token)
  const router = useRouter()
  const [report, setReport] = useState<ReportData>({
    remained_installments_list: [{
      class_fee: 0,
      class_fee_currency: "",
      class_name: "",
      installment_amount: 0,
      installment_date: "",
      installment_id: "",
      installment_received: false,
      installment_type: "",
      instructor_name: "",
      start_date: "",
      start_time: "",
      student_id: "",
      student_fathername: "",
      student_name: "",
      student_phone_number: "",
    }],
    students: 0,
    received_installments_amount: 0,
    remained_installments_amount: 0,
    remained_installments_count: 0,
    received_installments: 0,
    remained_installments: 0,
  });

  const getDate = () => {
    const date = new Date().toISOString().split('T')[0]
    const year = date.split('-')[0]
    const month = Number.parseInt(date.split('-')[1])

    return {
      start_date: `${year}-${month}-1`,
      end_date: `${year}-${month+1}-1`,
    }
  }

  useEffect(() => {
    const getReport = async () => {
      try {
        const dates = getDate()
        const report = await installmentsAPI.getMonthlyReport(dates)
        setReport(report)
      } catch (error) {

      }
    }
    getReport()
  }, [])

  const rows = report.remained_installments_list.map((item: any) => (
    <Table.Tr onClick={() => router.push(`/students/${item.student_id}`)}>
      <Table.Td>{item.student_name}</Table.Td>
      <Table.Td>{item.student_fathername}</Table.Td>
      <Table.Td>{item.student_phone_number}</Table.Td>
      <Table.Td>{item.class_name}</Table.Td>
      <Table.Td>{item.instructor_name}</Table.Td>
      <Table.Td>{item.class_fee_currency} {item.class_fee}</Table.Td>
      <Table.Td>{new Date(item.start_date).toDateString()}</Table.Td>
      <Table.Td>{item.start_time}</Table.Td>
      <Table.Td>{item.class_fee_currency} {item.installment_amount}</Table.Td>
      <Table.Td>{new Date(item.installment_date).toDateString()}</Table.Td>
      <Table.Td>{item.installment_received ? 'YES' : 'NO'}</Table.Td>
      <Table.Td>{item.installment_type}</Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Title style={{borderBottom: "2px solid white"}} mb="10px">
            Montly Report
      </Title>

      <Grid>
        <Grid.Col span={12}>
          <Table striped highlightOnHover stickyHeader withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Fields</Table.Th>
                <Table.Th>Values</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Total New Students</Table.Td>
                <Table.Td>{report.students}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Total Income</Table.Td>
                <Table.Td>{report.received_installments_amount}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Total Remaining Incomes</Table.Td>
                <Table.Td>{report.remained_installments_amount}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Received Installments Count</Table.Td>
                <Table.Td>{report.received_installments}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Remaining Installments Count</Table.Td>
                <Table.Td>{report.remained_installments}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Grid.Col>
      </Grid>
      <br />
      <Title style={{borderBottom: "2px solid white"}} mb="10px">
            Remaining Student's Installments
      </Title>

      <Grid>
        <Grid.Col span={12}>
          <Table.ScrollContainer minWidth={500}>
            <Table striped highlightOnHover stickyHeader withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Father Name</Table.Th>
                  <Table.Th>Phone Number</Table.Th>
                  <Table.Th>Class</Table.Th>
                  <Table.Th>Instructor Name</Table.Th>
                  <Table.Th>Class Fee</Table.Th>
                  <Table.Th>Start Date</Table.Th>
                  <Table.Th>Start Time</Table.Th>
                  <Table.Th>Installment Amount</Table.Th>
                  <Table.Th>Installment Date</Table.Th>
                  <Table.Th>Installment Received</Table.Th>
                  <Table.Th>Installment Type</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Report
