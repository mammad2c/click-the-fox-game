/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TableContainer as UITableContainer,
  Table as UITable,
  Thead as UIThead,
  Th as UITh,
  Tbody as UITbody,
  Td as UITd,
  Tr as UITr,
  TableProps as UITableProps,
} from "@chakra-ui/react";

interface TableProps {
  headers: Array<{ title: string; value: string }>;
  items: Array<Record<string, any>>;
  variant?: UITableProps["variant"];
}

const Table = ({ headers, items, variant = "striped" }: TableProps) => {
  const isEmptyTable = items.length === 0;

  const headerValues = headers.map((header) => header.value);

  const requiredItems = items.reduce(
    (acc: Array<unknown>, item, currentIndex) => {
      const newItem = headerValues.map((key) => {
        if (key === "item-index") {
          return currentIndex + 1;
        }

        return item[key];
      });

      return [...acc, { values: newItem, id: item.id }];
    },
    [],
  );

  return (
    <UITableContainer>
      <UITable variant={variant}>
        <UIThead>
          <UITr>
            {headers.map((header) => (
              <UITh key={header.value}>{header.title}</UITh>
            ))}
          </UITr>
        </UIThead>
        <UITbody>
          {isEmptyTable && (
            <UITr>
              <UITd textAlign="center" colSpan={headers.length}>
                No data
              </UITd>
            </UITr>
          )}
          {requiredItems.map((item: any) => {
            return (
              <UITr key={item.id}>
                {item.values.map((value: any, index: number) => (
                  <UITd key={index}>{value}</UITd>
                ))}
              </UITr>
            );
          })}
        </UITbody>
      </UITable>
    </UITableContainer>
  );
};

export { Table };
