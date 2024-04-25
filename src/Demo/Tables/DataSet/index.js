import React, { useEffect, useState } from 'react';
import DataSet from './Dataset';
import { connect } from 'react-redux';

import Aux from '../../../hoc/_Aux';
import { fetchAllDataSet } from '../../../store/services/dataSet';

import { useSnackbar } from 'notistack';

const DataSetIndex = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataset, setDataSet] = useState([]);

  const mask = async () => {
    try {
      const { data } = await fetchAllDataSet();
      setDataSet(data.payload.data);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    mask();
  }, []);

  return (
    <Aux>
      <DataSet dataset={dataset} />
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(DataSetIndex);
