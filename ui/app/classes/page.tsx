'use client';

import { ClassesAPICalls } from "@/api-calls/classes-api-calls";
import { token } from "@/components/Atoms/token";
import HeaderBox from "@/components/Molecules/HeaderBox/HeaderBox"
import { Table, Box, Button, Grid, Input, Modal, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { InstructorsResponse } from "../instructors/page";
import { InstructorsAPICalls } from "@/api-calls/instructors-api-calls";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export interface ClassesResponse {
  id: string;
  class_name: string;
  instructor_id: string;
  instructor_name: string;
  class_duration: number;
  start_date: string;
  start_time: string;
  class_fee: number;
  class_fee_currency: string;
}

const Classes = () => {

  const classesAPI = new ClassesAPICalls(token);
  const insAPI = new InstructorsAPICalls(token);

  const [reload, setReload] = useState(true);
  const [deleteAction, setDeleteAction] = useState(false);
  const [classesData, setClassesData] = useState<ClassesResponse[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [instructorsName, setInstructorsName] = useState<{name: string; id: string}[]>([]);

  const [classData, setClassData] = useState<ClassesResponse>({
    id: "",
    class_name: "",
    instructor_id: "",
    instructor_name: "",
    class_duration: 0,
    start_date: "",
    start_time: "",
    class_fee: 0,
    class_fee_currency: "",
  });

  const getClassInstructor = async (id: string) => {
    try {
      const data: InstructorsResponse = await insAPI.getOneInstructor(id);
      return data.name;
    } catch(error) {
      return `${error}`;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data: ClassesResponse[] = await classesAPI.getClasses();
          for (let classes of data) {
            classes.instructor_name = await getClassInstructor(classes.instructor_id);
          }
          setClassesData(data);
        } catch(error) {
          return error;
        }
    }
    setReload(false);
    fetchData();
  }, [reload])

  const getAllIns = async () => {
    try {
      const data: InstructorsResponse[] = await insAPI.getInstructors();
      const insNames = data.map((element) => (
        {name: element.name, id: element.id}
      ))

      setInstructorsName(insNames);
    } catch(error) {
      return `${error}`;
    }
  }

  const getOneClassData = async (id: string) => {
    try {
      const data: ClassesResponse = await classesAPI.getOneClass(id);
      data.instructor_name = await getClassInstructor(data.instructor_id);
      getAllIns()
      setClassData(data);
      setDeleteAction(true);
      open();
    } catch(error) {
      return error
    }
  } 

  const deleteClass = async (id: string) => {
    try {
      const deletedClass = await classesAPI.deleteClass(id);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: deletedClass.message
      })
      close();
      setReload(true);
    } catch(error) {
      return error;
    }
  }

  const getSelectedInsId = (name: string) => {
    const id = instructorsName.find(element => element.name === name)?.id;
    if (id) {
      setClassData({...classData, instructor_id: id, instructor_name: name})
    }
  }

  const rows = classesData.map((element) => 
    (<Table.Tr key={element?.id} onClick={() => {getOneClassData(element.id)}}>
      <Table.Td>{element.class_name}</Table.Td>
      <Table.Td>{element.instructor_name}</Table.Td>
      <Table.Td>{element.class_duration}</Table.Td>
      <Table.Td>{element.start_date}</Table.Td>
      <Table.Td>{element.start_time}</Table.Td>
      <Table.Td>{element.class_fee}</Table.Td>
      <Table.Td>{element.class_fee_currency}</Table.Td>
    </Table.Tr>
  ));

  const names = instructorsName.map((element) => (
    element.name
  ))

  const handleUpdateBtnClick = async () => {
    try {
      const updatedClass = await classesAPI.updateClass(classData);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: updatedClass.message
      })
      setReload(true);
      close();
    } catch (error) {
      return error
    }
  }

  const addClass = async () => {
    try{
      setClassData({
        id: "",
        class_name: "Class Name Here",
        instructor_id: "",
        instructor_name: "",
        class_duration: 0,
        start_date: "Class Start Date",
        start_time: "Class Start Time",
        class_fee: 0,
        class_fee_currency: "Class Fee Currency",
      })
      getAllIns();
      setDeleteAction(false);
      open();
    } catch(error) {
      return error;
    }
  }

  const handleAddBtnClick = async () => {
    try{
      const newInsData = await classesAPI.addClass(classData);
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
      <Modal opened={opened} onClose={close} title={deleteAction ? "Class Data" : "Add Class"} centered>
        <Grid>
          <Grid.Col span={6}>
            <Input.Wrapper label="Class Name">
              <Input onChange={(e:any) => setClassData({...classData, class_name: e.target.value})} placeholder={classData?.class_name} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Class Duration">
              <Input onChange={(e:any) => setClassData({...classData, class_duration: e.target.value})} placeholder={`${classData?.class_duration}`} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Class Fee">
              <Input onChange={(e:any) => setClassData({...classData, class_fee: e.target.value})} placeholder={`${classData?.class_fee}`} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Class Fee Currency">
              <Input onChange={(e:any) => setClassData({...classData, class_fee_currency: e.target.value})} placeholder={classData?.class_fee_currency} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Class Start Date">
              <Input onChange={(e:any) => setClassData({...classData, start_date: e.target.value})} placeholder={classData?.start_date} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Class Start Time">
              <Input onChange={(e:any) => setClassData({...classData, start_time: e.target.value})} placeholder={classData?.start_time} />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label="Instructor">
              <Select data={names} defaultValue={classData?.instructor_name} onChange={(e:any) => getSelectedInsId(e)}/>
            </Input.Wrapper>
          </Grid.Col>
          {deleteAction ? (
            <>
              <Grid.Col span={6}>
                <Button color="red" onClick={() => deleteClass(classData.id)} fullWidth>Delete</Button>
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
      <HeaderBox title="Classes" buttonClickEventHandler={() => addClass()} />
      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover stickyHeader withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Instructor</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Start Date</Table.Th>
              <Table.Th>Start Time</Table.Th>
              <Table.Th>Fee</Table.Th>
              <Table.Th>Fee Currency</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  )
}

export default Classes
