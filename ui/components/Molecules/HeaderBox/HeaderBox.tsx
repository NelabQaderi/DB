import { Button, Grid, GridCol, Title } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';

interface HeaderBoxProps {
    title: string;
    buttonClickEventHandler: () => void;
}

const HeaderBox = (
    {title, buttonClickEventHandler}: HeaderBoxProps,) => {

  const handleClick = () => {
    buttonClickEventHandler()
  }
  return (
     <Grid style={{borderBottom: "2px solid white"}} pb={10}>
      <GridCol span={3}>
        <Title size={30}>{title}</Title>
      </GridCol>
      <GridCol span={3} offset={6}>
        <Button fullWidth color="green" 
            leftSection={<IconPlus />}
            onClick={handleClick}>Add</Button>
      </GridCol>
    </Grid>
  )
}

export default HeaderBox