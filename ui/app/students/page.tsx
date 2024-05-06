'use client';

import { StudentsAPICalls } from "@/api-calls/students-api-calls";
import { token } from "@/components/Atoms/token";
import HeaderBox from "@/components/Molecules/HeaderBox/HeaderBox"
import { Button, FileInput, Grid, Input, Modal, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface StudentResponse {
  id: string;
  student_name: string;
  student_fathername: string;
  student_phone_number: string;
  student_address: string;
  student_registeration_date: string;
  student_photo: string;
}

export interface AddStudent {
  student_name: string;
  student_fathername: string;
  student_phone_number: string;
  student_address: string;
  student_photo: File | null;
}

const Students  = () => {

  const studentsAPI = new StudentsAPICalls(token);

  const [reload, setReload] = useState(true);
  const router = useRouter()
  const [studentsData, setStudentsData] = useState<StudentResponse[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [uploadPhoto, setUploadPhoto] = useState<Blob | string>('');
  const [studentData, setStudentData] = useState<AddStudent>({
    student_name: "",
    student_fathername: "",
    student_phone_number: "",
    student_address: "",
    student_photo: null,
  })

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data: StudentResponse[] = await studentsAPI.getStudents();
          setStudentsData(data);
        } catch(error) {
          return error;
        }
    }
    setReload(false);
    fetchData();
  }, [reload])
  
  const rows = studentsData.map((element) => (
    <Table.Tr onClick={() => {router.push(`/students/${element.id}`)}} key={element?.id}>
      <Table.Td>{element.student_name}</Table.Td>
      <Table.Td>{element.student_fathername}</Table.Td>
      <Table.Td>{element.student_phone_number}</Table.Td>
      <Table.Td>{element.student_address}</Table.Td>
      <Table.Td>{new Date(element.student_registeration_date).toDateString()}</Table.Td>
    </Table.Tr>
  ));

  const addStudent = async () => {

    try{
      const formData = new FormData()
      formData.append('student_name', studentData.student_name);
      formData.append('student_fathername', studentData.student_fathername);
      formData.append('student_phone_number', studentData.student_phone_number);
      formData.append('student_address', studentData.student_address);
      formData.append('student_photo', uploadPhoto);
      const newInsData = await studentsAPI.addStudent(formData);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: newInsData.message
      })
      setReload(true);
      close();
    } catch(error) {
      return error;
    }
  }

  

  return (
    <>

      <Modal opened={opened} onClose={close} title={"Add Student"} centered>
        <Grid>
          <Grid.Col span={6}>
            <Input.Wrapper label="Name">
              <Input placeholder="Name" onChange={(e) => setStudentData({...studentData, student_name: e.target.value})} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Father Name">
              <Input placeholder="Fahter Name" onChange={(e) => setStudentData({...studentData, student_fathername: e.target.value})} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Phone Number">
              <Input placeholder="Phone Number" onChange={(e) => setStudentData({...studentData, student_phone_number: e.target.value})} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Address">
              <Input placeholder="Address" onChange={(e) => setStudentData({...studentData, student_address: e.target.value})} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Photo">
              <FileInput
                placeholder="Photo"
                onChange={(e) => setUploadPhoto(e)}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button onClick={() => addStudent()} color="green" leftSection={<IconPlus />} fullWidth>Add Student</Button>
          </Grid.Col>
        </Grid>
      </Modal>

      <HeaderBox title="Students" buttonClickEventHandler={() => open()} />
      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover stickyHeader withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Father Name</Table.Th>
              <Table.Th>Phone Number</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Registeration Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  )
}

export default Students
