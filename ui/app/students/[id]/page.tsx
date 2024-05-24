'use client';

import { useEffect, useState } from "react";
import { StudentResponse } from "../page";
import { useRouter } from "next/navigation";
import { StudentsAPICalls } from "@/api-calls/students-api-calls";
import { token } from "@/components/Atoms/token";
import { Card, Button, Image,  Table, Grid, Title, Modal, Input, Select, Accordion, Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { ClassesAPICalls } from "@/api-calls/classes-api-calls";
import { InstallmentsAPICalls } from "@/api-calls/installments-api-calls";
import ImageDisplay from "@/components/Molecules/ImageDisplay/ImageDisplay";
import { IconDiscountCheckFilled, IconSquareXFilled } from "@tabler/icons-react";


export interface StudentUpdateType {
    student_name: string;
    student_fathername: string;
    student_phone_number: string;
    student_address: string;
}

export interface Installment {
    student_id: string;
    class_id: string;
    number_of_installments: number;
}

const GetStudent = ({params}: {params: {id: string}}) => {

    const [studentData, setStudentData] = useState<StudentResponse>({
        id: "",
        student_name: "",
        student_fathername: "",
        student_phone_number: "",
        student_address: "",
        student_registeration_date: "",
        student_photo: "",
    })
    const [editInstallments, setEditInstallments] = useState<{
        id: string,
        installment_type: string,
        installment_amount: number,
        installment_date: Date,
    }>({
        id: "",
        installment_type: "",
        installment_amount: 0,
        installment_date: new Date(),
    });
    
    const [updateStudentData, setUpdateStudentData] = useState<StudentUpdateType>({
        student_name: "",
        student_fathername: "",
        student_phone_number: "",
        student_address: "",
    })

    const [newInstallments, setNewInstallments] = useState<{
        id: string,
        instructor_name: string,
        class_name: string,
        installment_type: string,
        installment_amount: number,
        installment_received: boolean,
        installment_date: Date,
        class_fee: string,
        class_fee_currency: string,
        start_date: Date,
        start_time: string
    }[]>([])



    const [slide, setSlide] = useState(1);
    const studentsAPI = new StudentsAPICalls(token);
    const installmentsAPI = new InstallmentsAPICalls(token);
    const [reload, setReload] = useState(true);
    const router = useRouter()
    const [opened, { open, close }] = useDisclosure(false);
    const [opened2, open2] = useDisclosure(false);
    const [opened3, open3] = useDisclosure(false);
    const [classesList, setClassesList] = useState<{class_name: string, id: string}[]>([]);
    const [classId, setClassId] = useState("");
    const [installmentsNumber, setInstallmentsNumber] = useState(1);

    useEffect(() => {
    const fetchData = async () => {
        try {
          const data: StudentResponse = await studentsAPI.getStudent(params.id);
          setStudentData(data);
        } catch(error) {
          return error;
        }
    }
    setReload(false);
    fetchData();
  }, [reload])

  const deleteStudent = async () => {
    try {
      const deletedIns = await studentsAPI.deleteStudent(studentData.id);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: deletedIns.message
      })
      close();
      router.back()
    } catch(error) {
      return error;
    }
  }

  const updateStudent = async () => {
    try{
      const update = await studentsAPI.updateStudent(updateStudentData, studentData.id);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: update.message
      })
      setReload(true);
      close();
    } catch(error) {
      return error;
    }
  }

  useEffect(() => {
    const getClassesList = async () => {
        try{
            const classesAPI = new ClassesAPICalls(token)
            const classes = await classesAPI.getClasses();
            const classes_with_id = classes.map((item:any) => ({class_name: item.class_name, id: item.id}))
            setClassesList(classes_with_id);
        } catch(error) {
            return error;
        }
    }
    getClassesList()
  }, [])


  const addInstallment = async () => {
    try {
        const newInstallment: Installment = {
             student_id: studentData.id,
             class_id: classId,
             number_of_installments: installmentsNumber
        }
        const response = await installmentsAPI.addInstallments(newInstallment)
        notifications.show({
            title: 'Success',
            color: 'green',
            message: response.message
        })
        
        setSlide(1)
        setReload(true)
        open2.close()
    } catch(error) {
        return error
    }
  }

  useEffect(() => {
    const getAllInstallments = async () => {
        try {
            const arr = await installmentsAPI.getInstallmentsWithAllDetails(params.id)
            setNewInstallments(arr)
        } catch (error) {
            return error
        }
    }
    setReload(false)
    getAllInstallments()
  }, [reload])

  const markInstallmentReceived = async (id: string) => {
    try {
      const res = await installmentsAPI.receivedInstallment(id);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: res.message
      })
      setReload(true);
    } catch(error) {
      return error;
    }
  }

  const editInstallment = async (id: string) => {
    try {
        const res = await installmentsAPI.getInstallment(id)
        setEditInstallments(res)
        open3.open()
    } catch (error) {
        return error
    }
  }

  const sendUpdatedInstallment = async () => {
    try {
      const res = await installmentsAPI.updateInstallment(editInstallments);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: res.message
      })
      setReload(true);
      open3.close()
    } catch(error) {
      return error;
    }
  }



  const items = newInstallments.map((item: any) => (
    <Accordion.Item key={item.installment_id} value={item.installment_id}>
      <Accordion.Control>
        {item.installment_received ? (<IconDiscountCheckFilled color="green" size={20} />): (<IconSquareXFilled color="red" size={20} />)}

         {item.class_name} {item.installment_type} 
      </Accordion.Control>
      <Accordion.Panel>
        <Grid>
            <Grid.Col span={12}>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Fields</Table.Th>
                            <Table.Th>Info</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>Class</Table.Td>
                            <Table.Td>{item.class_name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Class Fee</Table.Td>
                            <Table.Td>{item.class_fee_currency} {item.class_fee}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Class Start Date</Table.Td>
                            <Table.Td>{new Date(item.start_date).toDateString()}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Class Start Time</Table.Td>
                            <Table.Td>{item.start_time}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Indtallment Date</Table.Td>
                            <Table.Td>{new Date(item.installment_date).toDateString()}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Amount</Table.Td>
                            <Table.Td>{item.installment_amount}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Received</Table.Td>
                            <Table.Td>{item.installment_received ? "YES" : "No"}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Type</Table.Td>
                            <Table.Td>{item.installment_type}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Instructor</Table.Td>
                            <Table.Td>{item.instructor_name}</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Grid.Col>
            <Grid.Col span={4}>
                <Button onClick={() => editInstallment(item.installment_id)} color="green" fullWidth>Edit Installment</Button>
            </Grid.Col>
            <Grid.Col span={4}>
                <Button onClick={() => markInstallmentReceived(item.installment_id)} color="blue" fullWidth>Installment Received</Button>
            </Grid.Col>
             <Grid.Col span={4}>
                <Button onClick={() => {}} color="cyan" fullWidth>Print Installment</Button>
            </Grid.Col>
        </Grid>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
        <Modal opened={opened3} onClose={open3.close} title="Edid Installment" centered>
            <Grid>
            <Grid.Col span={12}>
                <Input.Wrapper label="Installment Type">
                <Input onChange={(e:any) => setEditInstallments({...editInstallments, installment_type: e.target.value})} placeholder={editInstallments.installment_type} />
                </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={12}>
                <Input.Wrapper label="Installment Amount">
                <Input onChange={(e:any) => setEditInstallments({...editInstallments, installment_amount: e.target.value})} placeholder={`${editInstallments.installment_amount}`} />
                </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={12}>
                <Input.Wrapper label="Installment Date">
                <Input type="date" onChange={(e:any) => setEditInstallments({...editInstallments, installment_date: e.target.value})} placeholder={new Date(editInstallments.installment_date).toLocaleDateString()} />
                </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={12}>
                <Button onClick={() => sendUpdatedInstallment()} color="green" fullWidth>Update Installment</Button>
            </Grid.Col>
            </Grid>
        </Modal>

        <Modal opened={opened2} onClose={open2.close} title="Register Student to a Class" centered>
            {slide === 1 && (
                <Grid>
                    <Grid.Col span={12}>
                        <Title size={20}>Select Class</Title>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Input.Wrapper label="Classes">
                            <Select required data={classesList.map(item => (item.class_name))} 
                                onChange={e => classesList.map(item => (item.class_name === e ? setClassId(item.id) : ''))} />
                        </Input.Wrapper>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Button fullWidth color="green" onClick={() => setSlide(2)}>Next</Button>
                    </Grid.Col>
                </Grid>
            )}

            {slide === 2 && (
                <Grid>
                    <Grid.Col span={12}>
                        <Title size={20}>How Many Installments Can Pay</Title>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Input.Wrapper label="Enter Installments">
                            <Input required type="number" placeholder="1" onChange={(e) => setInstallmentsNumber(Number.parseInt(e.target.value))}/>
                        </Input.Wrapper>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Button fullWidth color="green" onClick={() => addInstallment()}>Next</Button>
                    </Grid.Col>
                </Grid>
            )}
        </Modal>

        <Modal opened={opened} onClose={close} title={"Update Student"} centered>
            <Grid>
                <Grid.Col span={6}>
                    <Input.Wrapper label="Name">
                    <Input placeholder={studentData.student_name} 
                        onChange={(e) => setUpdateStudentData({...updateStudentData, student_name: e.target.value})} />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Input.Wrapper label="Father Name">
                    <Input placeholder={studentData.student_fathername} onChange={(e) => setUpdateStudentData({...updateStudentData, student_fathername: e.target.value})} />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Input.Wrapper label="Phone Number">
                    <Input placeholder={studentData.student_phone_number} onChange={(e) => setUpdateStudentData({...updateStudentData, student_phone_number: e.target.value})} />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Input.Wrapper label="Address">
                    <Input placeholder={studentData.student_address} onChange={(e) => setUpdateStudentData({...updateStudentData, student_address: e.target.value})} />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Button onClick={() => updateStudent()} color="green" fullWidth>Update Student</Button>
                </Grid.Col>
            </Grid>
        </Modal>

        <Title style={{borderBottom: "2px solid white"}} mb="10px">
            Student Information
        </Title>

        <Grid>
            <Grid.Col span={{base: 12, lg: 4, sm: 12}}>
                <ImageDisplay
                    url={studentData.student_photo}
                    name={studentData.student_name}
                />
            </Grid.Col>
            <Grid.Col span={{base: 12, lg: 8, sm: 12}}>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Fields</Table.Th>
                            <Table.Th>Info</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>Name</Table.Td>
                            <Table.Td>{studentData.student_name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Fahter Name</Table.Td>
                            <Table.Td>{studentData.student_fathername}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Phone Number</Table.Td>
                            <Table.Td>{studentData.student_phone_number}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Registeration Date</Table.Td>
                            <Table.Td>{new Date(studentData.student_registeration_date).toDateString()}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Address</Table.Td>
                            <Table.Td>{studentData.student_address}</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <Grid>
                    <Grid.Col span={6}>
                        <Button onClick={() => open()} color="green" fullWidth mt="md" radius="md">
                            Edit
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button onClick={() => deleteStudent()} color="red" fullWidth mt="md" radius="md">
                            Delete
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button onClick={() => open2.open()} color="blue" fullWidth mt="md" radius="md">
                            Add Installments to a Class
                        </Button>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>           
        <br />
        <Title style={{borderBottom: "2px solid white"}} mb="10px">
            Student Classes Installments
        </Title>
        <br />
        <Grid>
            <Grid.Col>
                 <Accordion variant="separated">
                    {items}
                </Accordion>
            </Grid.Col>
        </Grid>
    </>
  )
}

export default GetStudent;
