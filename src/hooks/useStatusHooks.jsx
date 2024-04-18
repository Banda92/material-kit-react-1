import { useContext } from 'react';

import StatusContext from '../utils/Context API/StatusContext';

export const useIsDiagTrue = () => {
  const { isDiagTrue, setIsDiagTrue } = useContext(StatusContext);
  return { isDiagTrue, setIsDiagTrue };
};

export const useSelectedPatNo = () => {
  const { selectedPatNo, setSelectedPatNo } = useContext(StatusContext);
  return { selectedPatNo, setSelectedPatNo };
};

export const useOpenPatListModal = () => {
  const { openPatListModal, setOpenPatListModal } = useContext(StatusContext);
  return { openPatListModal, setOpenPatListModal };
};

export const useIsAiResult = () => {
  const { isAiResult, setIsAiResult } = useContext(StatusContext);
  return { isAiResult, setIsAiResult };
};

export const useIsLoading = () => {
  const { isLoading, setIsLoading } = useContext(StatusContext);
  return { isLoading, setIsLoading };
};

export const usePatientNumber = () => {
  const { patientNumber, setPatientNumber } = useContext(StatusContext);
  return { patientNumber, setPatientNumber };
};
