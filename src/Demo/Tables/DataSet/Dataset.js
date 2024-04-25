import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment-timezone';

import PLink from '../../../App/components/PLink';

import './Dataset.css';

const columns = [
  {
    field: 'action',
    width: 100,
    headerName: 'Action',
    headerClassName: 'bold-header',
    renderCell: (params) => <div>{params.row.action}</div>,
  },
  {
    field: 'name',
    width: 200,
    headerName: 'Dataset name',
    headerClassName: 'bold-header',
  },
  {
    field: 'createdBy',
    width: 250,
    headerName: 'CreatedBy (Moderator)',
    headerClassName: 'bold-header',
  },
  {
    field: 'createdAt',
    width: 150,
    headerName: 'CreatedAt',
    headerClassName: 'bold-header',
  },
  {
    field: 'updatedBy',
    width: 200,
    headerName: 'UpdatedBy',
    headerClassName: 'bold-header',
  },
  {
    field: 'updatedAt',
    width: 150,
    headerName: 'updatedAt',
    headerClassName: 'bold-header',
  },

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //   headerClassName: 'bold-header',
  // },
];

let rows = [
  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo({ dataset }) {
  rows = dataset.map((dst) => {
    return {
      id: dst.id,
      name: dst.name,
      action: <PLink text={'LookUp'} path={`/app/data/${dst.id}`} />,
      createdAt: moment(dst.createdAt).format('h:mm a YYYY/MM/DD'),
      createdBy: dst.createdByUser,
      updatedAt: moment(dst.updatedAt).format('h:mm a YYYY/MM/DD'),
      updatedBy: dst.updatedByUser,
    };
  });

  return (
    <Box sx={{ height: '85vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
