import PropTypes from 'prop-types';
import React, {  useMemo,  useState, useContext, createContext, } from 'react';


const StatusContext = createContext({
  isDiagTrue: {},
  setIsDiagTrue: () => { },

  isPatSelected: {},
  setIsPatSelected: () => { },

  selectedPatNo: {},
  setSelectedPatNo: () => { },

  openPatListModal: {},
  setOpenPatListModal: () => { },

  isAiResult: {},
  setIsAiResult: () => { },

  isLoading: {},
  setIsLoading: () => { },

  patientNumber: {},
  setPatientNumber: () => { },

});
export default StatusContext;

export const useStatus = () => useContext(StatusContext);

export const StatusProvider = ({ children }) => {


  const [isDiagTrue, setIsDiagTrue] = useState(true);

  const [isPatSelected, setIsPatSelected] = useState(false)


  const [selectedPatNo, setSelectedPatNo] = useState('')

  const [openPatListModal, setOpenPatListModal] = useState(false)

  const [isAiResult, setIsAiResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  // const [patientNumber, setPatientNumber] = useState('');




  const value = useMemo(() => ({
    isDiagTrue, setIsDiagTrue,
    isPatSelected, setIsPatSelected,
    selectedPatNo, setSelectedPatNo,
    openPatListModal, setOpenPatListModal,
    isAiResult, setIsAiResult,
    isLoading, setIsLoading,
    // patientNumber, setPatientNumber
  }), [
    isDiagTrue, isPatSelected, selectedPatNo, openPatListModal,
    isAiResult, isLoading, 
    // patientNumber
  ]);

  StatusProvider.propTypes = {
    children: PropTypes.node,
  };
  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;


};
