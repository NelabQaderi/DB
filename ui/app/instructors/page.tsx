'use client';

import { InstructorsAPICalls } from "@/api-calls/instructors-api-calls";
import { token } from "@/components/Atoms/token";
import HeaderBox from "@/components/Molecules/HeaderBox/HeaderBox"
import { Box, Button, Grid, Input, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";


export interface InstructorsResponse {
  id: string;
  name: string;
  fathername: string;
  phone_number: string;
  email: string;
  percentage: number;
}

const Instructors = () => {

  const instructorApi = new InstructorsAPICalls(token);
  const [reload, setReload] = useState(true);
  const [deleteAction, setDeleteAction] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [instructorsData, setInstructorsData] = useState<InstructorsResponse[]>([]);
  const [instructorData, setInstructorData] = useState<InstructorsResponse>({
      id: "",
      name: "",
      fathername: "",
      phone_number: "",
      email: "",
      percentage: 0
    });

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data: InstructorsResponse[] = await instructorApi.getInstructors();
          setInstructorsData(data);
        } catch(error) {
          return error;
        }
    }
    setReload(false);
    fetchData();
  }, [reload])


  const getOneInsData = async (id: string) => {
    try {
      const data: InstructorsResponse = await instructorApi.getOneInstructor(id);
      setInstructorData(data);
      setDeleteAction(true);
      open();
    } catch(error) {
      return error
    }
  } 

  const deleteIns = async (id: string) => {
    try {
      const deletedIns = await instructorApi.deleteInstructor(id);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: deletedIns.message
      })
      close();
      setReload(true);
    } catch(error) {
      return error;
    }
  }

  const addIns = async () => {
    try{
      setInstructorData({
        id: "",
        name: "Enter Name Here",
        fathername: "Enter Father Name Here",
        phone_number: "Enter Phone Number Here",
        email: "Enter Email Here",
        percentage: 0
      })
      setDeleteAction(false);
      open();
    } catch(error) {
      return error;
    }
  }

  const handleAddBtnClick = async () => {
    try{
      const newInsData = await instructorApi.addInstructor(instructorData);
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

  const handleUpdateBtnClick = async () => {
    try{
      const updateInsData = await instructorApi.updateInstructor(instructorData);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: updateInsData.message
      })
      setReload(true);
      close();
    } catch(error) {
      return error;
    }
  }

  const rows = instructorsData.map((element) => (
    <Table.Tr onClick={() => getOneInsData(element.id)} key={element?.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.fathername}</Table.Td>
      <Table.Td>{element.phone_number}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.percentage}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} title={deleteAction ? "Instructor Data" : "Add Instructor"} centered>
        <Grid>
          <Grid.Col span={6}>
            <Input.Wrapper label="Name">
              <Input onChange={(e:any) => setInstructorData({...instructorData, name: e.target.value})} placeholder={instructorData?.name} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Father Name">
              <Input onChange={(e:any) => setInstructorData({...instructorData, fathername: e.target.value})} placeholder={instructorData?.fathername} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Phone Number">
              <Input onChange={(e:any) => setInstructorData({...instructorData, phone_number: e.target.value})} placeholder={instructorData?.phone_number} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Email">
              <Input onChange={(e:any) => setInstructorData({...instructorData, email: e.target.value})} placeholder={instructorData?.email} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Percentage">
              <Input onChange={(e:any) => setInstructorData({...instructorData, percentage: e.target.value})} placeholder={`${instructorData?.percentage}`} />
            </Input.Wrapper>
          </Grid.Col>
          {deleteAction ? (
            <>
              <Grid.Col span={6}>
                <Button color="red" onClick={() => deleteIns(instructorData?.id)} fullWidth>Delete</Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button color="green" onClick={() => handleUpdateBtnClick()} fullWidth>Update</Button>
              </Grid.Col>
            </>
          ) : (
            <Grid.Col span={12}>
              <Button onClick={() => handleAddBtnClick()} color="green" leftSection={<IconPlus />} fullWidth>Add Instructor</Button>
            </Grid.Col>
          )}
        </Grid>
      </Modal>
      <HeaderBox title="Instructors" buttonClickEventHandler={() => addIns()} />
      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover stickyHeader withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Father Name</Table.Th>
              <Table.Th>Phone Number</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Percentage</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  )
}

export default Instructors
