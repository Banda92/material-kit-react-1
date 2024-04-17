import jsonData from './AKFP_sample.json';

const formatSex = (sex) => {
    // 성별 데이터가 예상대로 들어오지 않았을 경우의 기본값
    if (typeof sex !== 'number') return "Unknown";

    return sex === 0 ? "Male" : "Female";
};


// 진단 결과를 문자열로 포맷팅하는 함수
const formatDiagnosis = (value) => {
    // 값이 null이거나 undefined일 경우 'Missing Data' 반환
    if (value === null || value === undefined) {
      return 'Missing Data';
    }
    switch (value) {
      case 0:
        return 'Missing Data'; // 0일 경우 'Missing Data' 반환
      case 1:
        return 'Y'; // 1일 경우 'Y' 반환
      case 2:
        return 'N'; // 2일 경우 'N' 반환
      default:
        return 'Invalid Data'; // 예상 외의 값일 경우 'Invalid Data' 반환
    }
  };
  

export const getPatientInfoData = () => {
    if (!Array.isArray(jsonData)) {
        console.error('Invalid data format: expected an array');
        return [];
    }

    const data = jsonData.map(patient => {
        const { pat_id, real_age, sex, patientweight } = patient;

        return {
            pat_id: pat_id == null ? 'Unknown ID' : pat_id, // ID가 null 또는 undefined인 경우 처리
            real_age: real_age || 'Unknown Age', // 나이 정보가 없는 경우 처리
            sex: formatSex(sex), // 성별 정보 처리
            patientweight: patientweight || 'Unknown Weight' // 체중 정보가 없는 경우 처리
        };
    });

    return data;

};





export const getClinicalMarkers = () => {
    if (!Array.isArray(jsonData)) {
        console.error('Invalid data format: expected an array');
        return [];
    }

    const data = jsonData.map(patient => {
        const { pat_id, furo_amount, sum_before, albumin, bun, calcium, creatinine, chloride, glucose, hematocrit, hemoglobin, platelet_count, potassium, pt, ptt, sodium } = patient;

        return {
            pat_id: pat_id == null ? 'Unknown ID' : pat_id, // ID가 null 또는 undefined인 경우 처리
            furo_amount: furo_amount == null ? 'Missing Data' : furo_amount,
            sum_before: sum_before == null ? 'Missing Data' : sum_before,
            albumin: albumin == null ? 'Missing Data' : albumin,
            bun: bun == null ? 'Missing Data' : bun,
            calcium: calcium == null ? 'Missing Data' : calcium,
            creatinine: creatinine == null ? 'Missing Data' : creatinine,
            chloride: chloride == null ? 'Missing Data' : chloride,
            glucose: glucose == null ? 'Missing Data' : glucose,
            hematocrit: hematocrit == null ? 'Missing Data' : hematocrit,
            hemoglobin: hemoglobin == null ? 'Missing Data' : hemoglobin,
            platelet_count: platelet_count == null ? 'Missing Data' : platelet_count,
            potassium: potassium == null ? 'Missing Data' : potassium,
            pt: pt == null ? 'Missing Data' : pt,
            ptt: ptt == null ? 'Missing Data' : ptt,
            sodium: sodium == null ? 'Missing Data' : sodium,
        };
    });

    return data;
};



// JSON 데이터에서 진단 정보를 추출하고 포맷팅하는 함수
export const getIsDiagnosis = () => {
    if (!Array.isArray(jsonData)) {
      console.error('Invalid data format: expected an array'); // 입력 데이터가 배열이 아닐 경우 오류 메시지 출력
      return []; // 오류 시 빈 배열 반환
    }
  
    // 배열 데이터를 맵핑하여 각 환자의 진단 데이터를 처리
    const data = jsonData.map(patient => {
      const { pat_id, ...otherProps } = patient; // pat_id 추출 및 나머지 프로퍼티 분리
  
      // diag_로 시작하는 키만 필터링하여 새로운 객체 생성
      const diagnosisData = Object.keys(otherProps)
        .filter(key => key.startsWith('diag_')) // diag_로 시작하는 키만 선택
        .reduce((acc, key) => {
          acc[key] = formatDiagnosis(otherProps[key]); // 포맷팅 함수 적용하여 값 설정
          return acc; // 결과 누적
        }, {});
  
      return {
        pat_id: pat_id == null ? 'Unknown ID' : pat_id, // pat_id가 없을 경우 'Unknown ID'로 설정
        ...diagnosisData // 처리된 진단 데이터 추가
      };
    });
  
    return data; // 처리된 데이터 반환
  };




// export const getIsDiagnosis = () => {
//   // 입력 데이터가 배열 형태인지 확인
//   if (!Array.isArray(jsonData)) {
//     console.error('Invalid data format: expected an array'); // 배열이 아닐 경우 에러 로그 출력
//     return []; // 에러 상황에서 빈 배열 반환
//   }


//    // 배열 데이터를 맵핑하여 각 항목의 진단 데이터를 처리
//    const data = jsonData.map(patient => {
//     const { pat_id, ...otherDiags } = patient; // pat_id를 제외한 모든 진단 데이터 추출

//     return {
//       pat_id: pat_id == null ? 'Unknown ID' : pat_id, // pat_id가 null이나 undefined일 경우 'Unknown ID'로 설정
//       ...Object.keys(otherDiags).reduce((acc, key) => { // 나머지 진단 데이터에 대해 반복 처리
//         acc[key] = formatDiagnosis(patient[key]); // 각 키에 대해 포맷팅 함수 적용
//         return acc; // 누적 결과 반환
//       }, {}),
//     };
//   });

    // const data = jsonData.map(patient => {
    //     const { pat_id, diag_971, diag_980, diag_982, diag_989, diag_990, diag_991, diag_993, diag_B16, diag_B17, diag_B18, diag_B19, diag_B942, diag_C15, diag_C18, diag_C19, diag_C20, diag_C22, diag_C25, diag_C34, diag_C50, diag_C56, diag_C61,
    //         diag_C82, diag_C83, diag_C85, diag_C91, diag_C92, diag_C93, diag_C94, diag_C95, diag_D05, diag_E10, diag_E11, diag_E13,
    //         diag_E830, diag_E831, diag_G450, diag_G453, diag_G458, diag_G459, diag_H341, diag_I10, diag_I11, diag_I12, diag_I13,
    //         diag_I15, diag_I21, diag_I22, diag_I600, diag_I601, diag_I602, diag_I603, diag_I604, diag_I605, diag_I606, diag_I607,
    //         diag_I609, diag_I61, diag_I62, diag_I630, diag_I631, diag_I632, diag_I633, diag_I634, diag_I635, diag_I638, diag_I639,
    //         diag_I700, diag_I702, diag_I708, diag_I709, diag_I731, diag_I738, diag_I739, diag_I85, diag_K551, diag_K70, diag_K713,
    //         diag_K717, diag_K721, diag_K729, diag_K74, diag_K753, diag_K754, diag_K758, diag_K759, diag_K76, diag_N08, diag_N18,
    //         diag_N19, diag_N200, diag_N201, diag_N202, diag_N210, diag_R160, diag_R162, diag_R17, diag_R18, diag_T822, diag_Z225, diag_Z955, } = patient;

    //     return {
    //         pat_id: pat_id == null ? 'Unknown ID' : pat_id, // ID가 null 또는 undefined인 경우 처리
    //         diag_971: diag_971 == null ? 'Missing Data' : diag_971,
    //         diag_980: diag_980 == null ? 'Missing Data' : diag_980,
    //         diag_982: diag_982 == null ? 'Missing Data' : diag_982,
    //         diag_989: diag_989 == null ? 'Missing Data' : diag_989,
    //         diag_990: diag_990 == null ? 'Missing Data' : diag_990,
    //         diag_991: diag_991 == null ? 'Missing Data' : diag_991,
    //         diag_993: diag_993 == null ? 'Missing Data' : diag_993,
    //         diag_B16: diag_B16 == null ? 'Missing Data' : diag_B16,
    //         diag_B17: diag_B17 == null ? 'Missing Data' : diag_B17,
    //         diag_B18: diag_B18 == null ? 'Missing Data' : diag_B18,
    //         diag_B19: diag_B19 == null ? 'Missing Data' : diag_B19,
    //         diag_B942: diag_B942 == null ? 'Missing Data' : diag_B942,
    //         diag_C15: diag_C15 == null ? 'Missing Data' : diag_C15,
    //         diag_C18: diag_C18 == null ? 'Missing Data' : diag_C18,
    //         diag_C19: diag_C19 == null ? 'Missing Data' : diag_C19,
    //         diag_C20: diag_C20 == null ? 'Missing Data' : diag_C20,
    //         diag_C22: diag_C22 == null ? 'Missing Data' : diag_C22,
    //         diag_C25: diag_C25 == null ? 'Missing Data' : diag_C25,
    //         diag_C34: diag_C34 == null ? 'Missing Data' : diag_C34,
    //         diag_C50: diag_C50 == null ? 'Missing Data' : diag_C50,
    //         diag_C56: diag_C56 == null ? 'Missing Data' : diag_C56,
    //         diag_C61: diag_C61 == null ? 'Missing Data' : diag_C61,
    //         diag_C82: diag_C82 == null ? 'Missing Data' : diag_C82,
    //         diag_C83: diag_C83 == null ? 'Missing Data' : diag_C83,
    //         diag_C85: diag_C85 == null ? 'Missing Data' : diag_C85,
    //         diag_C91: diag_C91 == null ? 'Missing Data' : diag_C91,
    //         diag_C92: diag_C92 == null ? 'Missing Data' : diag_C92,
    //         diag_C93: diag_C93 == null ? 'Missing Data' : diag_C93,
    //         diag_C94: diag_C94 == null ? 'Missing Data' : diag_C94,
    //         diag_C95: diag_C95 == null ? 'Missing Data' : diag_C95,
    //         diag_D05: diag_D05 == null ? 'Missing Data' : diag_D05,
    //         diag_E10: diag_E10 == null ? 'Missing Data' : diag_E10,
    //         diag_E11: diag_E11 == null ? 'Missing Data' : diag_E11,
    //         diag_E13: diag_E13 == null ? 'Missing Data' : diag_E13,
    //         diag_E830: diag_E830 == null ? 'Missing Data' : diag_E830,
    //         diag_E831: diag_E831 == null ? 'Missing Data' : diag_E831,
    //         diag_G450: diag_G450 == null ? 'Missing Data' : diag_G450,
    //         diag_G453: diag_G453 == null ? 'Missing Data' : diag_G453,
    //         diag_G458: diag_G458 == null ? 'Missing Data' : diag_G458,
    //         diag_G459: diag_G459 == null ? 'Missing Data' : diag_G459,
    //         diag_H341: diag_H341 == null ? 'Missing Data' : diag_H341,
    //         diag_I10: diag_I10 == null ? 'Missing Data' : diag_I10,
    //         diag_I11: diag_I11 == null ? 'Missing Data' : diag_I11,
    //         diag_I12: diag_I12 == null ? 'Missing Data' : diag_I12,
    //         diag_I13: diag_I13 == null ? 'Missing Data' : diag_I13,
    //         diag_I15: diag_I15 == null ? 'Missing Data' : diag_I15,
    //         diag_I21: diag_I21 == null ? 'Missing Data' : diag_I21,
    //         diag_I22: diag_I22 == null ? 'Missing Data' : diag_I22,
    //         diag_I600: diag_I600 == null ? 'Missing Data' : diag_I600,
    //         diag_I601: diag_I601 == null ? 'Missing Data' : diag_I601,
    //         diag_I602: diag_I602 == null ? 'Missing Data' : diag_I602,
    //         diag_I603: diag_I603 == null ? 'Missing Data' : diag_I603,
    //         diag_I604: diag_I604 == null ? 'Missing Data' : diag_I604,
    //         diag_I605: diag_I605 == null ? 'Missing Data' : diag_I605,
    //         diag_I606: diag_I606 == null ? 'Missing Data' : diag_I606,
    //         diag_I607: diag_I607 == null ? 'Missing Data' : diag_I607,
    //         diag_I609: diag_I609 == null ? 'Missing Data' : diag_I609,
    //         diag_I61: diag_I61 == null ? 'Missing Data' : diag_I61,
    //         diag_I62: diag_I62 == null ? 'Missing Data' : diag_I62,
    //         diag_I630: diag_I630 == null ? 'Missing Data' : diag_I630,
    //         diag_I631: diag_I631 == null ? 'Missing Data' : diag_I631,
    //         diag_I632: diag_I632 == null ? 'Missing Data' : diag_I632,
    //         diag_I633: diag_I633 == null ? 'Missing Data' : diag_I633,
    //         diag_I634: diag_I634 == null ? 'Missing Data' : diag_I634,
    //         diag_I635: diag_I635 == null ? 'Missing Data' : diag_I635,
    //         diag_I638: diag_I638 == null ? 'Missing Data' : diag_I638,
    //         diag_I639: diag_I639 == null ? 'Missing Data' : diag_I639,
    //         diag_I700: diag_I700 == null ? 'Missing Data' : diag_I700,
    //         diag_I702: diag_I702 == null ? 'Missing Data' : diag_I702,
    //         diag_I708: diag_I708 == null ? 'Missing Data' : diag_I708,
    //         diag_I709: diag_I709 == null ? 'Missing Data' : diag_I709,
    //         diag_I731: diag_I731 == null ? 'Missing Data' : diag_I731,
    //         diag_I738: diag_I738 == null ? 'Missing Data' : diag_I738,
    //         diag_I739: diag_I739 == null ? 'Missing Data' : diag_I739,
    //         diag_I85: diag_I85 == null ? 'Missing Data' : diag_I85,
    //         diag_K551: diag_K551 == null ? 'Missing Data' : diag_K551,
    //         diag_K70: diag_K70 == null ? 'Missing Data' : diag_K70,
    //         diag_K713: diag_K713 == null ? 'Missing Data' : diag_K713,
    //         diag_K717: diag_K717 == null ? 'Missing Data' : diag_K717,
    //         diag_K721: diag_K721 == null ? 'Missing Data' : diag_K721,
    //         diag_K729: diag_K729 == null ? 'Missing Data' : diag_K729,
    //         diag_K74: diag_K74 == null ? 'Missing Data' : diag_K74,
    //         diag_K753: diag_K753 == null ? 'Missing Data' : diag_K753,
    //         diag_K754: diag_K754 == null ? 'Missing Data' : diag_K754,
    //         diag_K758: diag_K758 == null ? 'Missing Data' : diag_K758,
    //         diag_K759: diag_K759 == null ? 'Missing Data' : diag_K759,
    //         diag_K76: diag_K76 == null ? 'Missing Data' : diag_K76,
    //         diag_N08: diag_N08 == null ? 'Missing Data' : diag_N08,
    //         diag_N18: diag_N18 == null ? 'Missing Data' : diag_N18,
    //         diag_N19: diag_N19 == null ? 'Missing Data' : diag_N19,
    //         diag_N200: diag_N200 == null ? 'Missing Data' : diag_N200,
    //         diag_N201: diag_N201 == null ? 'Missing Data' : diag_N201,
    //         diag_N202: diag_N202 == null ? 'Missing Data' : diag_N202,
    //         diag_N210: diag_N210 == null ? 'Missing Data' : diag_N210,
    //         diag_R160: diag_R160 == null ? 'Missing Data' : diag_R160,
    //         diag_R162: diag_R162 == null ? 'Missing Data' : diag_R162,
    //         diag_R17: diag_R17 == null ? 'Missing Data' : diag_R17,
    //         diag_R18: diag_R18 == null ? 'Missing Data' : diag_R18,
    //         diag_T822: diag_T822 == null ? 'Missing Data' : diag_T822,
    //         diag_Z225: diag_Z225 == null ? 'Missing Data' : diag_Z225,
    //         diag_Z955: diag_Z955 == null ? 'Missing Data' : diag_Z955,

    //     };
    // });

//     return data;
// };