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
  headers: string[];
  items: Array<Record<string, any>>;
  variant?: UITableProps["variant"];
}

const Table = ({ headers, items, variant = "striped" }: TableProps) => {
  const isEmptyTable = items.length === 0;

  return (
    <UITableContainer>
      <UITable variant={variant}>
        <UIThead>
          <UITr>
            {headers.map((header) => (
              <UITh key={header}>{header}</UITh>
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
          {items.map((item) => {
            const itemKeys = Object.keys(item);

            return (
              <UITr key={item.id}>
                {itemKeys.map((key) => (
                  <UITd key={key}>{item[key]}</UITd>
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
