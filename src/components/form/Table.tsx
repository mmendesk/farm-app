import React from 'react';
import MUIDataTable from 'mui-datatables';

const Table = ({
  title,
  data,
  columns,
  options,
}: {
  title: string;
  data: Array<any>;
  columns: Array<any>;
  options?: any;
}) => {
  if (!options) {
    options = {
      selectableRowsHeader: false,
      selectableRows: 'none',
      download: false,
      print: false,
      textLabels: {
        body: {
          noMatch: 'Desculpe, nenhum registro encontrado',
          toolTip: 'Sort',
          columnHeaderTooltip: (column: any) => `Sort for ${column.label}`,
        },
        pagination: {
          next: 'Próxima página',
          previous: 'Página anterior',
          rowsPerPage: 'Total por página:',
          displayRows: 'de',
        },
        toolbar: {
          search: 'Buscar',
          downloadCsv: 'Baixar CSV',
          print: 'Imprimir',
          viewColumns: 'Ver colunas',
          filterTable: 'Filtrar Tabela',
        },
        filter: {
          all: 'Todos',
          title: 'FILTROS',
          reset: 'LIMPAR',
        },
        viewColumns: {
          title: 'Mostrar colunas',
          titleAria: 'Mostrar/Ocultar colunas',
        },
        selectedRows: {
          text: 'linha(s) selecionada(s)',
          delete: 'Deletar',
          deleteAria: 'Deletar linhas selecionadas',
        },
      },
    };
  }

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default Table;
