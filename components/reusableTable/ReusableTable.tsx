import React from "react";
import {
  Th,
  Td,
  Tr,
  Text,
  Table,
  Thead,
  Tbody,
  TableContainer,
} from "@chakra-ui/react";

export default function ReusableTable({ columns, data }: any) {
  if (!data)
    return (
      <TableContainer pt="2">
        <Table variant="striped" colorScheme="gray">
          <Tbody display="flex" justifyContent="center">
            <Text fontWeight="700" fontSize="xl" pt="6" pb="5">
              SIN DATOS QUE MOSTRAR
            </Text>
          </Tbody>
        </Table>
      </TableContainer>
    );

  return (
    <TableContainer pt="2">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {columns.map((column: any, index: number) => (
              <Th key={index} textAlign={column.textAlign}>
                {column.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item: any, index: number) => (
            <Tr key={index}>
              {Object.values(item).map((value: any, index: number) => (
                <Td textAlign={columns[index].textAlign} key={index}>
                  {value}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
