import { useEffect } from 'react';
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



export const getResult = {
    "predicted_class": 1,
    "probability": 0.9598062856106476,
    "variable_importance": [
      {
        "variable": "sum_before",
        "relative_importance": 661.1028442382812,
        "scaled_importance": 1,
        "percentage": 0.3388851283879525
      },
      {
        "variable": "creatinine",
        "relative_importance": 213.3405303955078,
        "scaled_importance": 0.3227039971992822,
        "percentage": 0.10935958552218421
      },
      {
        "variable": "patientweight",
        "relative_importance": 157.1207275390625,
        "scaled_importance": 0.2376645765608467,
        "percentage": 0.0805409905410909
      },
      {
        "variable": "pt",
        "relative_importance": 87.8848876953125,
        "scaled_importance": 0.13293678655485583,
        "percentage": 0.04505029997912416
      },
      {
        "variable": "bun",
        "relative_importance": 86.46662139892578,
        "scaled_importance": 0.1307914829780412,
        "percentage": 0.04432328850106419
      },
      {
        "variable": "ptt",
        "relative_importance": 82.42237854003906,
        "scaled_importance": 0.12467406434320463,
        "percentage": 0.04225018630159475
      },
      {
        "variable": "potassium",
        "relative_importance": 78.06077575683594,
        "scaled_importance": 0.11807659948396848,
        "percentage": 0.0400144035757375
      },
      {
        "variable": "hematocrit",
        "relative_importance": 62.84400939941406,
        "scaled_importance": 0.09505935414908485,
        "percentage": 0.03221420143528847
      },
      {
        "variable": "furo_amount",
        "relative_importance": 62.5491828918457,
        "scaled_importance": 0.09461339251068342,
        "percentage": 0.03206307166820269
      },
      {
        "variable": "calcium",
        "relative_importance": 61.593406677246094,
        "scaled_importance": 0.09316766251128998,
        "percentage": 0.031573135271743935
      },
      {
        "variable": "real_age",
        "relative_importance": 59.74212646484375,
        "scaled_importance": 0.09036737171155007,
        "percentage": 0.03062415836455047
      },
      {
        "variable": "glucose",
        "relative_importance": 58.78508377075195,
        "scaled_importance": 0.08891972600493615,
        "percentage": 0.030133572763404348
      },
      {
        "variable": "hemoglobin",
        "relative_importance": 57.831661224365234,
        "scaled_importance": 0.08747755622046753,
        "percentage": 0.02964484287083747
      },
      {
        "variable": "platelet_count",
        "relative_importance": 53.08705520629883,
        "scaled_importance": 0.08030075149270521,
        "percentage": 0.027212730479254477
      },
      {
        "variable": "chloride",
        "relative_importance": 52.407264709472656,
        "scaled_importance": 0.07927248410170734,
        "percentage": 0.026864265952439015
      },
      {
        "variable": "sodium",
        "relative_importance": 48.50867462158203,
        "scaled_importance": 0.07337538333763098,
        "percentage": 0.024865826202888304
      },
      {
        "variable": "albumin",
        "relative_importance": 28.321802139282227,
        "scaled_importance": 0.04284023641119626,
        "percentage": 0.014517919016378483
      },
      {
        "variable": "diag_I10",
        "relative_importance": 6.140742778778076,
        "scaled_importance": 0.009288634638765475,
        "percentage": 0.003147780142106821
      },
      {
        "variable": "diag_I21",
        "relative_importance": 3.1428134441375732,
        "scaled_importance": 0.004753894906863855,
        "percentage": 0.0016110242858553908
      },
      {
        "variable": "diag_I13",
        "relative_importance": 3.1146156787872314,
        "scaled_importance": 0.004711242291471115,
        "percentage": 0.0015965699488119402
      },
      {
        "variable": "diag_N18",
        "relative_importance": 3.050205945968628,
        "scaled_importance": 0.004613814586568686,
        "percentage": 0.0015635531485275371
      },
      {
        "variable": "diag_I739",
        "relative_importance": 2.9200453758239746,
        "scaled_importance": 0.0044169305899575025,
        "percentage": 0.001496832090058423
      },
      {
        "variable": "diag_I11",
        "relative_importance": 2.874283790588379,
        "scaled_importance": 0.004347710519836156,
        "percentage": 0.0014733744377083274
      },
      {
        "variable": "diag_I61",
        "relative_importance": 2.42264986038208,
        "scaled_importance": 0.0036645582173730363,
        "percentage": 0.0012418642819795878
      },
      {
        "variable": "diag_E11",
        "relative_importance": 2.144495725631714,
        "scaled_importance": 0.00324381560951018,
        "percentage": 0.0010992808692957016
      },
      {
        "variable": "diag_I12",
        "relative_importance": 1.9888190031051636,
        "scaled_importance": 0.0030083352695247727,
        "percentage": 0.0010194800840469082
      },
      {
        "variable": "diag_K74",
        "relative_importance": 0.9692395925521851,
        "scaled_importance": 0.0014660950274218486,
        "percentage": 0.0004968378015967918
      },
      {
        "variable": "diag_C15",
        "relative_importance": 0.8572162985801697,
        "scaled_importance": 0.0012966459092576574,
        "percentage": 0.00043941401543249464
      },
      {
        "variable": "diag_E10",
        "relative_importance": 0.8563462495803833,
        "scaled_importance": 0.0012953298522971268,
        "percentage": 0.00043896802330045936
      },
      {
        "variable": "diag_C34",
        "relative_importance": 0.8094077110290527,
        "scaled_importance": 0.0012243294943945484,
        "percentage": 0.0004149070578970535
      },
      {
        "variable": "diag_Z955",
        "relative_importance": 0.7906259894371033,
        "scaled_importance": 0.0011959198123675566,
        "percentage": 0.00040527943915587544
      },
      {
        "variable": "diag_I634",
        "relative_importance": 0.6937590837478638,
        "scaled_importance": 0.0010493966102160834,
        "percentage": 0.0003556249049829596
      },
      {
        "variable": "diag_N200",
        "relative_importance": 0.6324284076690674,
        "scaled_importance": 0.0009566263603021519,
        "percentage": 0.00032418644693029444
      },
      {
        "variable": "diag_C85",
        "relative_importance": 0.5807262063026428,
        "scaled_importance": 0.0008784203719040902,
        "percentage": 0.0002976836005113106
      },
      {
        "variable": "diag_C25",
        "relative_importance": 0.5154643058776855,
        "scaled_importance": 0.0007797036578652153,
        "percentage": 0.00026422997420020965
      },
      {
        "variable": "diag_R18",
        "relative_importance": 0.4447086453437805,
        "scaled_importance": 0.0006726769506734935,
        "percentage": 0.0002279602147926032
      },
      {
        "variable": "diag_R17",
        "relative_importance": 0.4298388957977295,
        "scaled_importance": 0.0006501846112808474,
        "percentage": 0.00022033789546978096
      },
      {
        "variable": "diag_K729",
        "relative_importance": 0.3886749744415283,
        "scaled_importance": 0.0005879190776880672,
        "percentage": 0.0001992370321240473
      },
      {
        "variable": "diag_I633",
        "relative_importance": 0.3302983343601227,
        "scaled_importance": 0.0004996171733925763,
        "percentage": 0.00016931282994996912
      },
      {
        "variable": "diag_991",
        "relative_importance": 0.3054769039154053,
        "scaled_importance": 0.0004620716830637356,
        "percentage": 0.00015658922163949135
      },
      {
        "variable": "diag_K76",
        "relative_importance": 0.2838068902492523,
        "scaled_importance": 0.00042929310125152,
        "percentage": 0.00014548104773368364
      },
      {
        "variable": "diag_I85",
        "relative_importance": 0.25825056433677673,
        "scaled_importance": 0.0003906359904325196,
        "percentage": 0.0001323807277706794
      },
      {
        "variable": "diag_C95",
        "relative_importance": 0.24473857879638672,
        "scaled_importance": 0.0003701974374023047,
        "percentage": 0.00012545440610297104
      },
      {
        "variable": "diag_I702",
        "relative_importance": 0.23691773414611816,
        "scaled_importance": 0.0003583674404231211,
        "percentage": 0.00012144539605785131
      },
      {
        "variable": "diag_E831",
        "relative_importance": 0.22869722545146942,
        "scaled_importance": 0.000345932902035799,
        "percentage": 0.00011723151592001873
      },
      {
        "variable": "diag_B18",
        "relative_importance": 0.1806865781545639,
        "scaled_importance": 0.00027331084676053677,
        "percentage": 0.00009262098139426452
      },
      {
        "variable": "diag_C83",
        "relative_importance": 0.15497422218322754,
        "scaled_importance": 0.0002344177211365471,
        "percentage": 0.00007944067952377
      },
      {
        "variable": "diag_I639",
        "relative_importance": 0.11147809773683548,
        "scaled_importance": 0.00016862444127778618,
        "percentage": 0.00005714431543176933
      },
      {
        "variable": "diag_I631",
        "relative_importance": 0.09848912805318832,
        "scaled_importance": 0.00014897701456218496,
        "percentage": 0.00005048609470675992
      },
      {
        "variable": "diag_I22",
        "relative_importance": 0.08290096372365952,
        "scaled_importance": 0.00012539798375724357,
        "percentage": 0.00004249551182516387
      },
      {
        "variable": "diag_G458",
        "relative_importance": 0.07625256478786469,
        "scaled_importance": 0.00011534145625363695,
        "percentage": 0.00003908750421096717
      },
      {
        "variable": "diag_I635",
        "relative_importance": 0.0751938745379448,
        "scaled_importance": 0.0001137400560189432,
        "percentage": 0.00003854481348683248
      },
      {
        "variable": "diag_C50",
        "relative_importance": 0.07217565178871155,
        "scaled_importance": 0.0001091746199819665,
        "percentage": 0.00003699765510929464
      },
      {
        "variable": "diag_C93",
        "relative_importance": 0.06799111515283585,
        "scaled_importance": 0.0001028449896190884,
        "percentage": 0.00003485263751112241
      },
      {
        "variable": "diag_K70",
        "relative_importance": 0.05302342772483826,
        "scaled_importance": 0.00008020450703994706,
        "percentage": 0.000027180114665524902
      },
      {
        "variable": "diag_980",
        "relative_importance": 0.0381043404340744,
        "scaled_importance": 0.00005763753819268165,
        "percentage": 0.000019532504530392435
      },
      {
        "variable": "diag_C56",
        "relative_importance": 0.027784811332821846,
        "scaled_importance": 0.00004202797125284696,
        "percentage": 0.000014242654433906218
      },
      {
        "variable": "diag_N19",
        "relative_importance": 0.01326283160597086,
        "scaled_importance": 0.000020061676820120497,
        "percentage": 0.000006798603924864145
      },
      {
        "variable": "diag_C61",
        "relative_importance": 0.011631895788013935,
        "scaled_importance": 0.000017594684230130845,
        "percentage": 0.000005962576824273374
      },
      {
        "variable": "diag_B942",
        "relative_importance": 0.010379956103861332,
        "scaled_importance": 0.000015700970271608882,
        "percentage": 0.000005320825326309602
      },
      {
        "variable": "diag_K717",
        "relative_importance": 0.005296563729643822,
        "scaled_importance": 0.000008011709185348447,
        "percentage": 0.000002715049095883747
      },
      {
        "variable": "diag_I700",
        "relative_importance": 0.005251839756965637,
        "scaled_importance": 0.000007944058632839154,
        "percentage": 0.000002692123329711119
      },
      {
        "variable": "diag_K758",
        "relative_importance": 0.004564254079014063,
        "scaled_importance": 0.000006904000064124621,
        "percentage": 0.0000023396629481213045
      },
      {
        "variable": "diag_B19",
        "relative_importance": 0.0026534537319093943,
        "scaled_importance": 0.000004013677682731327,
        "percentage": 0.0000013601756768202654
      },
      {
        "variable": "diag_C91",
        "relative_importance": 0.00034289361792616546,
        "scaled_importance": 5.186691010552911e-7,
        "percentage": 1.7576924490198622e-7
      },
      {
        "variable": "diag_K721",
        "relative_importance": 0.00016010960098356009,
        "scaled_importance": 2.421856181363694e-7,
        "percentage": 8.207310429585919e-8
      },
      {
        "variable": "diag_I630",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I709",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I708",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I638",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I632",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I607",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I62",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I609",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I738",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I606",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I731",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_K753",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_K551",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_K713",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I604",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_K754",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_K759",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_N08",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_N201",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_N202",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_N210",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_R160",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_R162",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_T822",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I605",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I601",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I603",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I602",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_971",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_982",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_989",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_990",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_993",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_B16",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_B17",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_C18",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_C19",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_C20",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_C22",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_C82",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_C92",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_C94",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_D05",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_E13",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_E830",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_G450",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_G453",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_G459",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_H341",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I15",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_I600",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      },
      {
        "variable": "diag_Z225",
        "relative_importance": 0,
        "scaled_importance": 0,
        "percentage": 0
      }
    ],
    "explain_row": "iVBORw0KGgoAAAANSUhEUgAABkAAAAOECAYAAAD5Tf2iAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjcuMSwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy/bCgiHAAAACXBIWXMAAA9hAAAPYQGoP6dpAAEAAElEQVR4nOzdeXxM1//H8fckskcSSyTWCFJbEfu+VYigllpLa6mli6VoUdXaWtS+K20VRVstLaqhgmoVtbSlat9pkVAkxJJI7u8P39yfkUVCmBqv5+ORRzv3nnPu5965Z2bMZ845FsMwDAEAAAAAAAAAANgRB1sHAAAAAAAAAAAAkNlIgAAAAAAAAAAAALtDAgQAAAAAAAAAANgdEiAAAAAAAAAAAMDukAABAAAAAAAAAAB2hwQIAAAAAAAAAACwOyRAAAAAAAAAAACA3SEBAgAAAAAAAAAA7A4JEAAAAAAAAAAAYHdIgAAAAAAAAAAAALtDAgQAAAAAAAAAANgdEiAAAAAAAAAAAMDukAABAAAAAAAAAAB2hwQIAAAAAAAAAACwOyRAAABAhmzcuFEWi0UbN260dShpmj9/viwWi06cOPHIj33r1i0NHDhQ+fPnl4ODg5o3b/7IYwAA4L/mxIkTslgsmj9/vq1Dwf/s2LFD1apVk4eHhywWi3bt2mXrkOxSSvd+586d5enp+chisFgsGj58+CM7HgD8V5AAAQA8kfbs2aNWrVopICBArq6uyps3r+rXr6/p06dblStYsKCaNGmSYhtJiYClS5emuH/WrFmyWCyqXLlyqnFYLBbzz8HBQXny5FGDBg3+88mF/5LRo0dr+fLltg7Dyqeffqrx48erVatWWrBggfr16/dQj1enTh117txZ0u1/TNepUydZmZs3b2r69OmqUaOGsmXLJmdnZ+XJk0dNmzbVF198oYSEBLNs0j/S7/zz8vJScHCwZsyYYVU26fgWi0VBQUEpxhcREWG2k1p/SU2/fv1Urlw5Zc+eXe7u7ipevLiGDx+uq1evZqidO12+fFmurq6yWCzav3//fbcjSWfOnNHw4cMf6Auj4cOHm68Bp0+fTrY/JiZGbm5uslgs6tWrl7k96XmaMGHCfR9bks6ePau33npLdevWVdasWR8owbl+/Xq99NJLeuqpp+Tu7q5ChQqpW7duOnv2bIrlt2zZoho1asjd3V3+/v7q06dPsud2x44d6tWrl0qWLCkPDw8VKFBAbdq00aFDh9KMJT4+XiVKlEj1GiUmJmrcuHEKDAyUq6urSpcurS+++CJZuY8//li1a9eWn5+fXFxcFBgYqC5duqSaXJ07d66KFy8uV1dXBQUFJXtfSbJu3TrVrVtXOXPmlI+PjypVqqSFCxemeU4p2b59u1577TWVL19eTk5OslgsaZaPjIzUyy+/rLx588rV1VUFCxZU165drcok3ZN3/7m6uqbZ9i+//GKWvXDhgtW+gwcPql+/fqpWrZrZ/9JKUF+5ckUDBw5UYGCgXFxclDdvXrVq1UrXrl2zirNgwYKS/j/pjdSl9960VwcOHNDAgQMVHBysrFmzKnfu3GrcuLF27tyZYvl//vlHbdq0kY+Pj7y8vNSsWTMdO3bsEUd92759+zR8+PBM/1FHfHy8WrdurYsXL2ry5MlauHChAgICUi0/atQoNW3aVH5+fml+mZ6R/n7jxg2NGTNGJUqUkLu7u/LmzavWrVtr7969mXCGD0d4ePh/NpHwX44NAGwli60DAADgUduyZYvq1q2rAgUKqHv37vL399fp06f166+/aurUqerdu3emHGfx4sUqWLCgtm/friNHjqhIkSIplqtfv746duwowzB0/PhxzZo1S88884y+//57hYWFZUos9mz06NFq1apVslEWL774otq1aycXF5dHHtOGDRuUN29eTZ48+ZEfOyXnz59XWFiYfvvtN4WGhuqdd95R9uzZde7cOa1bt07t27fXkSNH9O6771rVe/7559WoUSNJUnR0tMLDw9W7d2+dPHlS48ePtyrr6uqqI0eOaPv27apUqZLVvsWLF8vV1VU3btzIcOw7duxQzZo11aVLF7m6uuqPP/7QBx98oHXr1unnn3+Wg0PGf8/z9ddfy2KxyN/fX4sXL9b777+f4TaSnDlzRiNGjFDBggUVHBx83+1IkouLi7744gsNHDjQavs333zzQO3ey8GDBzV27FgFBQWpVKlS2rp16323NWjQIF28eFGtW7dWUFCQjh07phkzZmjVqlXatWuX/P39zbK7du1SvXr1VLx4cU2aNEl///23JkyYoMOHD2v16tVmubFjx2rz5s1q3bq1SpcurXPnzmnGjBkqV66cfv31Vz399NMpxjJ9+nSdOnUq1ViHDBmiDz74QN27d1fFihW1YsUKtW/fXhaLRe3atTPL/fHHHwoMDFTTpk2VLVs2HT9+XB9//LFWrVql3bt3K0+ePGbZOXPm6JVXXlHLli3Vv39/bdq0SX369NG1a9c0aNAgs9zKlSvVvHlzVa1a1Uw2fPXVV+rYsaMuXLiQoaRpeHi4PvnkE5UuXVqFChVKMzF0+vRpVa9eXZL0yiuvKG/evDpz5oy2b9+eYvkPP/zQ6tfJjo6OqbadmJio3r17y8PDQ7Gxscn2b926VdOmTVOJEiVUvHjxNJOG0dHRql27tv7++2/16NFDRYoU0fnz57Vp0ybdvHlT7u7uqdZFytJ7bz5sAQEBun79upycnB7ZMZN88sknmjt3rlq2bKnXXntN0dHRmjNnjqpUqaI1a9YoJCTELHv16lXVrVtX0dHRevvtt+Xk5KTJkyerdu3a2rVrl3LkyPFIY9+3b59GjBihOnXqmEm/zHD06FGdPHlSH3/8sbp163bP8u+88478/f1VtmxZ/fDDD6mWy0h/79Chg1auXKnu3burXLlyOnPmjGbOnKmqVatqz549aSZkbCU8PFwzZ87MUKLhUd37acV2/fp1ZcnC14AAnkAGAABPmEaNGhm+vr7GpUuXku2LjIy0ehwQEGA0btw4xXZ+/PFHQ5Lx9ddfJ9t37NgxQ5LxzTffGL6+vsbw4cNTbEOS0bNnT6ttf/75pyHJaNCgQTrP6NFKOu8ff/zR1qEYhmEYHh4eRqdOnWwdhpW6desaJUuWzLT2EhISjOvXr6e6v3bt2uY16NSpk1G7dm2r/aGhoYaDg4OxbNmyFOvv2LHDWLRokfn4+PHjhiRj/PjxVuUSExONihUrGnny5El2/JIlSxpFixY1+vbta7Xv+vXrhpeXl9GyZctU+0tGTZgwwZBkbN269b7q16pVy3juueeMfv36GYGBgQ8Uy44dOwxJxrx58+67jWHDhhmSjOeee84IDg5Otr9+/frm9bvz9SK15ymjYmJijH///dcwDMP4+uuvH6h///TTT0ZCQkKybZKMIUOGWG0PCwszcufObURHR5vbPv74Y0OS8cMPP5jbNm/ebNy8edOq7qFDhwwXFxejQ4cOKcYRGRlpeHt7GyNHjkzxGv3999+Gk5OT1fVMTEw0atasaeTLl8+4detWmue5c+dOQ5IxZswYc9u1a9eMHDlyJHvP6NChg+Hh4WFcvHjR3Fa/fn0jT548xo0bN8xt8fHxRuHChY3SpUuneey7nTt3zrh27ZphGIbRs2dPI61/4oWFhRmBgYHGhQsX0mwz6Z48f/58uuP48MMPjRw5chivv/56inX//fdfIyYmxjAMwxg/frwhyTh+/HiKbb366quGj4+PcezYsXvGGRAQYBiGYcybNy/Nc/8viI2NtclxM3Jv2rOdO3caV65csdp24cIFw9fX16hevbrV9rFjxxqSjO3bt5vb9u/fbzg6OhqDBw9+JPHe6UFfm1OT9Pqc3vfmpD57/vx5Q5IxbNiwFMult7///fffhiTjzTfftNq+YcMGQ5IxadKkdJ/Lo3Sv19o7xcfHJ3sPS9KpUyfDw8MjM0PLUGwA8KRgCiwAwBPn6NGjKlmypHx8fJLty5UrV6YcY/HixcqWLZsaN26sVq1aafHixemuW6pUKeXMmVPHjx+/Z9lt27apYcOG8vb2lru7u2rXrq3Nmzeb+/fv3y83Nzd17NjRqt4vv/wiR0dHq199Jk33tXbtWgUHB8vV1VUlSpRI16/PN23apNatW6tAgQJycXFR/vz51a9fP12/ft2qXNJcx//884+aN28uT09P+fr66s0330w2rdKECRNUrVo15ciRQ25ubipfvnyy6ZMsFotiY2O1YMECc9qVpKmgUlsDZNasWSpZsqRcXFyUJ08e9ezZU5cvX7YqU6dOHT399NPat2+f6tata07JMG7cuDSvQ9KURD/++KP27t1rxpQ0nVBsbKzeeOMN5c+fXy4uLipatKgmTJggwzCSnVevXr20ePFiM9Y1a9akeezUbN26VT/88IN69Oih5557LsUyFSpUUIcOHe7ZlsVikZ+fX6q/Hnz++ee1ZMkSJSYmmtu+++47Xbt2TW3atLmv+FOS9OvXu5+39Dh16pQ2bdqkdu3aqV27djp+/Li2bNmS4jGS7qU71alTx5xibOPGjapYsaIkqUuXLubzfef83l9//bXKly8vNzc35cyZUy+88IL++eefFGNr3769du3apQMHDpjbzp07pw0bNqh9+/YZPtf0ypo1q7Jnz54pbdWqVSvZqJxatWope/bsVtONxcTEKCIiQi+88IK8vLzM7R07dpSnp6e++uorc1u1atXk7Oxs1WZQUJBKliyZ6hRmb731looWLaoXXnghxf0rVqxQfHy8XnvtNXObxWLRq6++qr///vueo2BS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w5z+6mH7+eefNWLECLVp00bPPPOMuT1perw7p4BK4urqmmz6vDsdOHBAPXv2VNWqVZP98nv+/Pnas2ePxo4dm2Zc169fT/XYd8Z3p9WrVys8PFwTJ05UgQIFki30ff369WRTdaV2Ti4uLnrqqafUqlUrffHFF1q0aJEqVKigF1544aH9Ujapz/j7++v7779XmzZt9Oabb+rjjz/W0aNHrUYevf7665o+fbrat2+vli1basqUKVqwYIEOHz6sWbNmWbXbp08fhYWFqUGDBpkap8Vi0fr169W+fXu9+uqrWr58uS5dumRO73I/zp49q127dqlz585Wv8guXbq06tevr/Dw8GR1Unq/+vfff83X1rS4uLiYo4WShIeHy9/f3+p1yMnJSX369NHVq1f1008/mceRbvch6fZIj4oVK6p+/frmCJDLly/rr7/+MsumJiP35oNImv5sxYoVVlMhpte9PhusWbNGTk5O6t69u7nNwcFBPXv2vK94o6Ki1L59ewUGBlqNvLrX69OdZVKSdB/d/V75xhtvSNI9pxx7UPdzn9tStmzZFBwcrLfeekvLly/XhAkTdOLECbVu3Vo3btxIs+6yZctUpkyZFD9nJI0ATG+fS9K2bVtly5bNfJzUvzLy+a9ly5by9fVNd/k7R1EkTYMaFxdnjtx7GBISErR27Vo1b95chQoVMrfnzp1b7du31y+//JLsda5Hjx5WIytr1qyphIQEnTx5UtL/vwasWrXqnlMsAsCjRAIEAPBEqlixor755htdunRJ27dv1+DBg3XlyhW1atVK+/btsyqbM2dOhYSEJPsrX758snYTEhL05Zdfqm7dujp+/LiOHDmiI0eOqHLlyoqMjNT69euT1WnWrJkiIiK0bt06bdu2TRcuXNDEiROTzaN/p8OHD0uSOnXqZPUltq+vrz755BPdvHnTaoquwoULa/jw4dqxY4dKliypd999N8V2ixQpkmzKmKeeekqSUp0iRbq9rkLSP7ST5u5Omlf67qnCXF1dk/2jMFu2bLp06ZLVtlWrVqlKlSpydXVV9uzZ5evrqw8//DDNqcfSkvSPs6JFi1ptd3Z2VqFChcz9SfLly5fsWqQUZ0aOnydPnmRzYidNYXH38QMDA+/rOHdLOt7dCYOWLVuayY3SpUunWDcoKMi835977jnNmDFDr732mqZMmaI9e/akWKddu3aKjo7W6tWrtXjxYjVp0iRd84CnxcvLSyEhIWrWrJnGjh2rN954Q82aNdPu3bsz1M6iRYvk4eGhQoUKmX3T1dVVBQsWvO9psFKT2v0m3Z5H/u7nO0nZsmVVrFgxff7551q8eLH8/f2tEgePkwMHDqhFixZ6+umn9cknn1jtS0pwprS2w40bN1Kd9/3cuXNq3LixvL29zQRbkpiYGA0ePFgDBgxQ/vz504zNzc0t1WPfGd+d6tatq7CwMPXv319ff/21RowYoRkzZli1GRcXl+Lx7j6nXr166bvvvtOXX36pdu3aqUOHDlq3bp1y586t119/Pc3Y71fS8du0aWP1/tK6dWtlyZIlxbVw7tS+fXv5+/tbfSG3ZMkSbdmyRRMnTsz0OJ999lmrxG2VKlUUGBh4zzjTkla/LF68uPlDgjsVKFDA6nHSF6PpeS/ImzdvssTDyZMnFRQUlOw9/u73Aj8/PwUFBZnJjk2bNqlmzZqqVauWzpw5o2PHjmnz5s1KTEy8ZwIkI/fmg2jbtq2qV6+ubt26yc/PT+3atdNXX32VrmRIej4bnDx5Urlz55a7u7tVuSJFimQ41tjYWDVp0kRXrlzRihUrrO61e70+3VkmJSdPnpSDg0OyuPz9/eXj45Pq639muZ/73FaSftxStWpVjRkzRs2aNdMbb7yhZcuW6ZdfftG8efPSrH/06FE9/fTTaZZJb59L8iB9PklGPsM5ODhYJSCk9H32flDnz5/XtWvXUr1PEhMTdfr0aavt97o2tWvXVsuWLTVixAjlzJlTzZo107x58zJ9HScAyCgSIACAJ5qzs7MqVqyo0aNH68MPP1R8fLy+/vrr+25vw4YNOnv2rL788ksFBQWZf0kLQKf0JWu+fPkUEhKievXqqVKlSvLw8LjncZK+TBg/fnyKo1MiIiKS/eJ/7dq1kqQzZ87o33//ve9zvFtCQoLq16+v77//XoMGDdLy5csVERFhLsh49xcfd35hmZpNmzapadOmcnV11axZsxQeHq6IiAi1b9/+novxZpbU4nxUx8+sL6SKFSsmScnWvMmfP7+Z3Ljzl473krTmQdKvku+WO3du1alTRxMnTtTPP//8UEYvJC0M/OWXX6a7jmEY+uKLLxQbG6sSJUpY9c8TJ05oxYoVVkmi1NaOSGkUV2Zr3769lixZos8//1xt27ZNMxn6X3X69Gk1aNBA3t7eCg8PT5YES1rg9uzZs8nqnj17Vnny5Em2PTo6WmFhYbp8+bLWrFmTrMyECRMUFxentm3b6sSJEzpx4oQ5B/ylS5d04sQJ80vg3Llz69y5c8n6c1I8KR3/ToULF1bZsmWtXtNz586thIQERUVFWZWNi4vTv//+a7YZFxenuXPnqnHjxlbPrZOTk8LCwrRz585Uv6x+EEnHv3uxYUdHR+XIkSNdX+7lz59fFy9eNB8PGDBArVu3lrOzs3nNk9a3OX36tM6cOZNpcUpSrly57jsJfb8e5L3gQV/Ha9SooU2bNun69ev67bffVLNmTT399NPy8fHRpk2btGnTJnl6eqps2bJptpPeezM16X09dHNz088//6x169bpxRdf1J9//qm2bduqfv3693ztTM9ng8wSFxen5557Tn/++adWrFiR7Av07Nmzy8XFJdXXJ+nerxFS6tctPR7Fe81/wbJlyxQZGammTZtaba9du7a8vLzStX5MZsuMz3+Z9RkuiS0/k9zpXtfGYrFo6dKl2rp1q3r16qV//vlHL730ksqXL39fI3cBILM8fv+aAgDgIUmaEiqlf/Cm1+LFi5UrVy59/fXXyf6ef/55ffvtt5ky1UThwoUl/f8v41P6c3JyMsvPnj1bERERGjVqlOLi4lJdqPbIkSPJ/oF36NAhSUp1Ee49e/bo0KFDmjhxogYNGqRmzZopJCQkXV8OpGbZsmVydXXVDz/8oJdeeklhYWEKCQlJsWx6v2AICAiQJB08eNBqe1xcnI4fP27uf1gCAgJ05syZZAunHjhwwCq+zNakSRNJKSff7setW7ckJR9Rcqf27dtr06ZN8vLyUqNGjTLluHe6efOmEhMTMzQa6KefftLff/+tkSNHJuubH330ka5du6bly5eb5bNly5biQuV3/1I0tfsvtfstaVtaz3fSYvKHDh16LKe/+vfff9WgQQPdvHlTP/zwg5nsuNPTTz+tLFmyaOfOnVbb4+LitGvXLgUHB1ttv3Hjhp599lkdOnRIq1atSnF6uFOnTunSpUsqWbKkAgMDFRgYaP4yfvTo0QoMDDRH+AUHB+vatWvav3+/VRtJi77effyUXL9+3eoeTKpz9znt3LlTiYmJ5v5///1Xt27dSvGLq/j4eCUmJj6UL7WSRi3+888/Vtvj4uJ04cKFe07XYhiGTpw4YVXu9OnT+vzzz83rHRgYaC4qXK5cufvq/6nFKd1O4GdkWpm7pdUvDxw4oJw5c6brRwgPIiAgQIcPH07244CU3gtq1qypU6dOmVNoVqtWTQ4ODmZiZNOmTapWrdo9kwfpvTdTk97XQ+n2r9nr1aunSZMmad++fRo1apQ2bNigH3/8Mc1jpEdAQIDOnj2ra9euWW0/cuRIuttITExUx44dtX79en3++efmaNW7z6FUqVLJrpd0+zWiUKFCaY5sDAgIUGJiojlaN0lkZKQuX75s9RyndG3j4uKSfRbNSDLlv3Cfp1dkZKSk5F/kG4ahhIQE8zNHagoXLpzsBx53y0ifS68HSW7dLTExMdn0Wnd/9k76ocrd90pKfTC9sfn6+srd3T3V+8TBweGeoylTU6VKFY0aNUo7d+7U4sWLtXfv3gz9aAUAMhsJEADAE+fHH39M8VdcSXMipzQUPD2uX7+ub775Rk2aNFGrVq2S/fXq1UtXrlxJcZ2RjCpfvrwKFy6sCRMmpPhF9Pnz583/P378uAYMGKCWLVvq7bff1oQJE7Ry5Up99tlnyeqdOXNG3377rfk4JiZGn332mYKDg+Xv759iLElfvNx5TQ3DML8Eux+Ojo6yWCxW/yA+ceKE1RfUSTw8PFL8YuZuISEhcnZ21rRp06xinTt3rqKjo9W4ceP7jjc9GjVqpISEBKspcyRp8uTJslgsCgsLeyjHrV69uurXr6+PPvpIK1asSLFMRn7V+N1330mSypQpk2qZVq1aadiwYZo1a1aq886nx+XLl1OcQzppOqWU1rFJTdL0VwMGDEjWN7t3766goCCrJFHhwoX166+/Wv0Sf9WqVcmmg0j6Eunue7BChQrKlSuXZs+ebTX1w+rVq7V///4077fChQtrypQpGjNmjCpVqpTuc/wviI2NVaNGjfTPP/8oPDxcQUFBKZbz9vZWSEiIFi1aZJUUXLhwoa5evarWrVub2xISEtS2bVtt3bpVX3/9tapWrZpim3369NG3335r9TdnzhxJUufOnfXtt9+a05I0a9ZMTk5OVutZGIah2bNnK2/evKpWrZqk2wm/lEYcbN++XXv27LG6B5955hllz55dH374oVXZDz/8UO7u7uZznitXLvn4+Ojbb7+1ur+uXr2q7777TsWKFcv0Xw9LUp06dZQrVy4tXrzYal79+fPnmyP5ktz5HnLneZw/f14NGzY0t919vb/99lu1bdtWkvTZZ59p8uTJGY6zaNGiKlOmjFasWKELFy6Y29euXavTp09bxZlRuXPnVnBwsBYsWGDVZ//66y+tXbv2oSRs79aoUSOdO3dOS5YsMbfdunVL06dPl6enp9UX8kkJvLFjx6p06dLy9vY2t69fv147d+685/RXUvrvzdQULlxY0dHR+vPPP81tZ8+etfq8IMlqdFCSpORKZkyBExoaqvj4eH388cfmtsTExAytC9O7d28tWbJEs2bNMkcTpqRVq1basWOHVRLk4MGD2rBhg9XrU0qS7qMpU6ZYbZ80aZIkWV3vwoULJxtR+dFHHyVLCKT2XpOS/8J9nl5JUz3d/eX4ypUrFRsbe8/RTS1bttTu3buT3YvS/3+2yUifS6+MPB/pcednQ8MwNGPGDDk5OZmjbgMCAuTo6JjsXrl7TaaMxObo6KgGDRpoxYoVVlNtRUZG6vPPP1eNGjXk5eWVofO4dOlSss+UmfkaAAD3K4utAwAA4FHr3bu3rl27phYtWqhYsWKKi4vTli1btGTJEhUsWDDZgqXptXLlSl25ciXZMP4kVapUka+vrxYvXmx+QXS/HBwc9MknnygsLEwlS5ZUly5dlDdvXv3zzz/68ccf5eXlpe+++06GYeill16Sm5ub+cXHyy+/rGXLlun1119PNlLjqaeeUteuXbVjxw75+fnp008/VWRkZJpzMBcrVkyFCxfWm2++qX/++UdeXl5atmzZA01T0rhxY02aNEkNGzZU+/btFRUVpZkzZ6pIkSJWX8BIt5NB69at06RJk5QnTx4FBgaqcuXKydr09fXV4MGDNWLECDVs2FBNmzbVwYMHNWvWLFWsWNFqwfOH4dlnn1XdunU1ZMgQnThxQmXKlNHatWu1YsUK9e3b1xzV8zAsWrRIDRs2VPPmzc3RNNmyZdO5c+e0bt06/fzzzykmYH7//XctWrRIknTlyhWtX79ey5YtU7Vq1dJc8Njb21vDhw9/4Lg3btyoPn36qFWrVgoKClJcXJw2bdqkb775xlwwOj1u3rypZcuWqX79+lYLkt+padOmmjp1qqKiopQrVy5169ZNS5cuVcOGDdWmTRsdPXpUixYtSvY8FS5cWD4+Ppo9e7ayZs0qDw8PVa5cWYGBgRo7dqy6dOmi2rVr6/nnn1dkZKSmTp2qggULql+/fmnGnJF1INavX5/iQrHNmze/59zoSd5//31J0t69eyXdTkT88ssvkqR33nkn3bF06NBB27dv10svvaT9+/dbjbDw9PRU8+bNzcejRo1StWrVVLt2bfXo0UN///23Jk6cqAYNGlh9yf7GG29o5cqVevbZZ3Xx4kXznkySdB+UK1dO5cqVs9qX9KVOyZIlrY6dL18+9e3bV+PHj1d8fLwqVqyo5cuXa9OmTVq8eLGZ2L169ary58+vtm3bqmTJkvLw8NCePXs0b948eXt7W62n5Obmpvfee089e/ZU69atFRoaqk2bNmnRokUaNWqUuRixo6Oj3nzzTb3zzjuqUqWKOnbsqISEBM2dO1d///13svO7l5MnT2rhwoWS/v8X/knPZ0BAgF588UVJtxd0Hj9+vDp16qRatWrpxRdf1KlTpzR16lTVrFnT6svggIAAtW3bVqVKlZKrq6t++eUXffnllwoODrYaQXjnNU2ya9cuSVJYWJhy5sxpbo+Ojtb06dMlyZzWZsaMGfLx8ZGPj4/VIsCTJ09W/fr1VaNGDb388suKjo7WpEmT9NRTT+nVV1/N0PW52/jx4xUWFqaqVauqa9euun79uqZPn55pr1v30qNHD82ZM0edO3fWb7/9poIFC2rp0qXavHmzpkyZYjWyoEiRIvL399fBgwfVu3dvc3utWrU0aNAgSUpXAiS992Zq2rVrp0GDBqlFixbq06ePrl27pg8//FBPPfWUfv/9d7PcyJEj9fPPP6tx48YKCAhQVFSUZs2apXz58qlGjRoZvVTJNG/eXJUqVdIbb7yhI0eOqFixYlq5cqWZeLnXL9+nTJmiWbNmqWrVqnJ3d0/W11q0aGF+efzaa6/p448/VuPGjfXmm2/KyclJkyZNkp+fn7mYeWrKlCmjTp066aOPPtLly5dVu3Ztbd++XQsWLFDz5s1Vt25ds2y3bt30yiuvqGXLlqpfv752796tH374warvSLe/RHZ0dNTYsWMVHR0tFxcXPfPMM8qVK1eKMTys+3zhwoU6efKkOQrn559/Nl9vXnzxRXM0RXr7+7PPPquSJUtq5MiROnnypKpUqaIjR45oxowZyp07t7p27ZpmPAMGDNDSpUvVunVrc6qlixcvauXKlZo9e7bKlCmToT6XXkkj1fr06aPQ0FA5OjqqXbt2GW5Hur3+zZo1a9SpUydVrlxZq1ev1vfff6+3337bHPHm7e2t1q1ba/r06bJYLCpcuLBWrVqVbFq7jMb2/vvvKyIiQjVq1NBrr72mLFmyaM6cObp586bGjRuX4XNZsGCBZs2apRYtWqhw4cK6cuWKPv7444c2IhgA0s0AAOAJs3r1auOll14yihUrZnh6ehrOzs5GkSJFjN69exuRkZFWZQMCAozGjRun2M6PP/5oSDK+/vprwzAM49lnnzVcXV2N2NjYVI/duXNnw8nJybhw4YJhGIYhyejZs+d9n8sff/xhPPfcc0aOHDkMFxcXIyAgwGjTpo2xfv16wzAMY+rUqYYkY9myZVb1Tp06ZXh5eRmNGjVKdq4//PCDUbp0acPFxcUoVqyYeX53n/ePP/5obtu3b58REhJieHp6Gjlz5jS6d+9u7N6925BkzJs3zyzXqVMnw8PDI9l5DBs2zLj7Y8ncuXONoKAgM4558+alWO7AgQNGrVq1DDc3N0OS0alTJ8MwDGPevHmGJOP48eNW5WfMmGEUK1bMcHJyMvz8/IxXX33VuHTpklWZ2rVrGyVLlkwWZ6dOnYyAgIBk2++WWv0rV64Y/fr1M/LkyWM4OTkZQUFBxvjx443ExESrcg96X6Tk+vXrxpQpU4yqVasaXl5eRpYsWQx/f3+jSZMmxuLFi41bt26ZZY8fP25IsvrLkiWLUahQIWPAgAHGlStX0nW+d7q7v6THkSNHjI4dOxqFChUy3NzcDFdXV6NkyZLGsGHDjKtXr6a7nWXLlhmSjLlz56ZaZuPGjYYkY+rUqea2iRMnGnnz5jVcXFyM6tWrGzt37jRq165t1K5d26ruihUrjBIlShhZsmRJds8vWbLEKFu2rOHi4mJkz57d6NChg/H3339b1U+6r8+fP5/medx9X6T0PN35t3DhwnRcnf9vO7W/jAgICEi1nZT6zqZNm4xq1aoZrq6uhq+vr9GzZ08jJibGqkzt2rXvO76kazR+/Phk+xISEozRo0cbAQEBhrOzs1GyZElj0aJFVmVu3rxpvP7660bp0qUNLy8vw8nJyQgICDC6du2a7LUlyUcffWQULVrUcHZ2NgoXLmxMnjw5WR83DMNYvHixUalSJcPHx8dwc3MzKleubCxdujTN80lJUt9K6e/ue9UwDOOLL74wypQpY7i4uBh+fn5Gr169kl3zbt26GSVKlDCyZs1qODk5GUWKFDEGDRqUrFxKUruf07pfU7o3IiIijCpVqhiurq5G9uzZjRdffNE4e/Zshq5NatatW2dUr17dcHNzM7y8vIxnn33W2LdvX7rOI7X3lrul9boYGRlpdOnSxciZM6fh7OxslCpVyup1406tW7c2JBlLliwxt8XFxRnu7u6Gs7Ozcf369Xuf8P+k995Mydq1a42nn37acHZ2NooWLWosWrQo2Xvy+vXrjWbNmhl58uQxnJ2djTx58hjPP/+8cejQIbNM0n1wv58Nzp8/b7Rv397ImjWr4e3tbXTu3NnYvHmzIcn48ssv0zyHTp06pflacvdzevr0aaNVq1aGl5eX4enpaTRp0sQ4fPhwuq5XfHy8MWLECCMwMNBwcnIy8ufPbwwePNi4ceOGVbmEhARj0KBBRs6cOQ13d3cjNDTUOHLkiBEQEGB+nkny8ccfG4UKFTIcHR2TfQ5LSXru84y+N6f1enxnPBnp7xcvXjT69etnPPXUU4aLi4uRM2dOo127dsaxY8fSFdO///5r9OrVy8ibN6/h7Oxs5MuXz+jUqZP5Wdsw0tfn0nq/kGQMGzbMfHzr1i2jd+/ehq+vr2GxWMz7NK020rr3jx49ajRo0MBwd3c3/Pz8jGHDhhkJCQlW9c+fP2+0bNnScHd3N7Jly2a8/PLLxl9//ZWszdRiS+k8DMMwfv/9dyM0NNTw9PQ03N3djbp16xpbtmyxKpP0urdjxw6r7Xf/m+D33383nn/+eaNAgQKGi4uLkStXLqNJkybGzp07k10PAHiULIbxiFbyBAAA/2kFCxbU008/rVWrVtk6FAAAgHRZvny5WrRooV9++UXVq1e3dTgAAOA/hjVAAAAAAADAf97169etHickJGj69Ony8vJKNgUeAACAxBogAAAAeMQSEhJSXGT5Tp6envL09Hykbdmb6OjoZF8W3s3f3/+Rt4X0OX/+fLKFkO/k7Ox8z7UbAHvTu3dvXb9+XVWrVtXNmzf1zTffaMuWLRo9erTc3NxsHR4AAPgPIgECAACAR+r06dMKDAxMs8ywYcPStVBrZrZlb15//XUtWLAgzTLpnQ03M9tC+lSsWFEnT55MdX/t2rW1cePGRxcQ8B/wzDPPaOLEiVq1apVu3LihIkWKaPr06eai2gAAAHdjDRAAAAA8Ujdu3NAvv/ySZplChQqpUKFCj7Qte7Nv3z6dOXMmzTIhISGPvC2kz+bNm9McdZMtWzaVL1/+EUYEAAAAPH5IgAAAAAAAAAAAALvDIugAAAAAAAAAAMDukAABAAAAgIdo48aNslgsVmt2dO7cWQULFsy0Y8yfP18Wi0UnTpzItDYBAACAxx0JEAAAAAB4TIwePVrLly+3dRjp8uGHH6p169YqUKCALBaLOnfubOuQAAAA8IQhAQIAAAAAj9jHH3+sgwcPZrheagmQF198UdevX1dAQEAmRJc5xo4dqw0bNqhkyZLKkiWLrcMBAADAE4hPoQAAAACQgsTERMXFxcnV1TXT23ZycsrU9hwdHeXo6JipbT6on376yRz94enpaetwAAAA8ARiBAgAAAAAuzV8+HBZLBYdOHBAbdq0kZeXl3LkyKHXX39dN27csCprsVjUq1cvLV68WCVLlpSLi4vWrFkjSfrnn3/00ksvyc/PTy4uLipZsqQ+/fTTZMf7+++/1bx5c3l4eChXrlzq16+fbt68maxcSmuAJCYmaurUqSpVqpRcXV3l6+urhg0baufOnWZ8sbGxWrBggSwWi9W0UqmtATJr1izzXPLkyaOePXvq8uXLVmXq1Kmjp59+Wvv27VPdunXl7u6uvHnzaty4ccniPnXqlA4cOJDWJTcFBATIYrGkqywAAADwMDACBAAAAIDda9OmjQoWLKgxY8bo119/1bRp03Tp0iV99tlnVuU2bNigr776Sr169VLOnDlVsGBBRUZGqkqVKmaCxNfXV6tXr1bXrl0VExOjvn37SpKuX7+uevXq6dSpU+rTp4/y5MmjhQsXasOGDemKsWvXrpo/f77CwsLUrVs33bp1S5s2bdKvv/6qChUqaOHCherWrZsqVaqkHj16SJIKFy6canvDhw/XiBEjFBISoldffVUHDx7Uhx9+qB07dmjz5s1Wo1AuXbqkhg0b6rnnnlObNm20dOlSDRo0SKVKlVJYWJhZrmPHjvrpp59kGEZ6Lz0AAABgMyRAAAAAANi9wMBArVixQpLUs2dPeXl5adasWXrzzTdVunRps9zBgwe1Z88elShRwtzWrVs3JSQkaM+ePcqRI4ck6ZVXXtHzzz+v4cOH6+WXX5abm5s++ugjHTp0SF999ZVat24tSerevbvKlClzz/h+/PFHzZ8/X3369NHUqVPN7W+88YaZbHjhhRf0yiuvqFChQnrhhRfSbO/8+fMaM2aMGjRooNWrV8vB4fbg/2LFiqlXr15atGiRunTpYpY/c+aMPvvsM7344ouSbidjAgICNHfuXKsECAAAAPA4YQosAAAAAHavZ8+eVo979+4tSQoPD7faXrt2bavkh2EYWrZsmZ599lkZhqELFy6Yf6GhoYqOjtbvv/9utpU7d261atXKrO/u7m6O1kjLsmXLZLFYNGzYsGT77mcaqXXr1ikuLk59+/Y1kx/S7YSMl5eXvv/+e6vynp6eVkkVZ2dnVapUSceOHbMqt3HjRkZ/AAAA4LHBCBAAAAAAdi8oKMjqceHCheXg4JBszYzAwECrx+fPn9fly5f10Ucf6aOPPkqx7aioKEnSyZMnVaRIkWQJi6JFi94zvqNHjypPnjzKnj37Pcumx8mTJ1M8trOzswoVKmTuT5IvX75kcWfLlk1//vlnpsQDAAAA2AIJEAAAAABPnNRGVbi5uVk9TkxMlHR7+qlOnTqlWOfOKbQeV46OjiluZ7QHAAAAHmckQAAAAADYvcOHD1uN7jhy5IgSExNVsGDBNOv5+voqa9asSkhIUEhISJplAwIC9Ndff8kwDKsEy8GDB+8ZX+HChfXDDz/o4sWLaY4CSe90WAEBAeaxCxUqZG6Pi4vT8ePH73kuAAAAgD1gDRAAAAAAdm/mzJlWj6dPny5J91zg29HRUS1bttSyZcv0119/Jdt//vx58/8bNWqkM2fOaOnSpea2a9eupTp11p1atmwpwzA0YsSIZPvuHIXh4eGhy5cv37O9kJAQOTs7a9q0aVb1586dq+joaDVu3PiebaTk1KlTOnDgwH3VBQAAAB41RoAAAAAAsHvHjx9X06ZN1bBhQ23dulWLFi1S+/btVaZMmXvW/eCDD/Tjjz+qcuXK6t69u0qUKKGLFy/q999/17p163Tx4kVJtxcYnzFjhjp27KjffvtNuXPn1sKFC+Xu7n7PY9StW1cvvviipk2bpsOHD6thw4ZKTEzUpk2bVLduXfXq1UuSVL58ea1bt06TJk1Snjx5FBgYqMqVKydrz9fXV4MHD9aIESPUsGFDNW3aVAcPHtSsWbNUsWJFqwXPM6Jjx4766aef0jU11nfffafdu3dLkuLj4/Xnn3/q/ffflyQ1bdrULqYOAwAAwH8bCRAAAAAAdm/JkiUaOnSo3nrrLWXJkkW9evXS+PHj01XXz89P27dv18iRI/XNN99o1qxZypEjh0qWLKmxY8ea5dzd3bV+/Xr17t1b06dPl7u7uzp06KCwsDA1bNjwnseZN2+eSpcurblz52rAgAHy9vZWhQoVVK1aNbPMpEmT1KNHD73zzju6fv26OnXqlGICRJKGDx8uX19fzZgxQ/369VP27NnVo0cPjR49Wk5OTuk69wexbNkyLViwwHz8xx9/6I8//pB0e9F1EiAAAAB42CwGq9oBAAAAsFPDhw/XiBEjdP78eeXMmdPW4QAAAAB4hFgDBAAAAAAAAAAA2B0SIAAAAAAAAAAAwO6QAAEAAAAAAAAAAHaHNUAAAAAAAAAAAIDdYQQIAAAAAAAAAACwOyRAAAAAAAAAAACA3cli6wCAjEpMTNSZM2eUNWtWWSwWW4cDAAAAAAAAAHgIDMPQlStXlCdPHjk4ZHw8BwkQPHbOnDmj/Pnz2zoMAAAAAAAAAMAjcPr0aeXLly/D9UiA4LGTNWtWSbdvei8vLxtHA/w3xMbGKk+ePJKkkydPysfHx7YBAU+g+Ph4rV27Vg0aNJCTk5OtwwGeOPRBwLbog4Bt0QcB26IPPjwxMTHKnz+/+Z1wRpEAwWMnadorLy8vEiDA/zg6Opr/T98AbCM+Pl7u7u7y8vLiAy9gA/RBwLbog4Bt0QcB26IPPnz3uxQCi6ADAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7YzEMw7B1EEBGxMTEyNvbW9HR0fLy8rJ1OMB/QmxsrDw9PSVJX+85K1d3DxtHBAAAAAAAgMzQpFBWW4dgMw/6XTAjQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQB6i+fPny8fH54HbOXfunOrXry8PD49MaQ8AAAAAAAAAAHtHAuQxMHnyZJ09e1a7du3SoUOHbB2OFcMwNHToUOXOnVtubm4KCQnR4cOH71lv5syZKliwoFxdXVW5cmVt3779EUQLAAAAAAAAAHhSkAB5DBw9elTly5dXUFCQcuXKdV9txMXFZXJUt40bN07Tpk3T7NmztW3bNnl4eCg0NFQ3btxItc6SJUvUv39/DRs2TL///rvKlCmj0NBQRUVFPZQYAQAAAAAAAABPHrtLgCxdulSlSpWSm5ubcuTIoZCQEMXGxqpOnTrq27evVdnmzZurc+fO5uOCBQvq/fffV8eOHeXp6amAgACtXLlS58+fV7NmzeTp6anSpUtr586dGYpp+fLlCgoKkqurq0JDQ3X69Gmr/StWrFC5cuXk6uqqQoUKacSIEbp165YZ07Jly/TZZ5/JYrGY8Z46dcqMycvLS23atFFkZKTZ5vDhwxUcHKxPPvlEgYGBcnV1lSRdvnxZ3bp1k6+vr7y8vPTMM89o9+7dGTqfJIZhaMqUKXrnnXfUrFkzlS5dWp999pnOnDmj5cuXp1pv0qRJ6t69u7p06aISJUpo9uzZcnd316effnpfcQAAAAAAAAAAcLcstg4gM509e1bPP/+8xo0bpxYtWujKlSvatGmTDMNIdxuTJ0/W6NGj9e6772ry5Ml68cUXVa1aNb300ksaP368Bg0apI4dO2rv3r2yWCz3bO/atWsaNWqUPvvsMzk7O+u1115Tu3bttHnzZknSpk2b1LFjR02bNk01a9bU0aNH1aNHD0nSsGHDtGPHDnXs2FFeXl6aOnWq3NzclJiYaCY/fvrpJ926dUs9e/ZU27ZttXHjRvPYR44c0bJly/TNN9/I0dFRktS6dWu5ublp9erV8vb21pw5c1SvXj0dOnRI2bNn16ZNmxQWFpbmOc2ZM0cdOnTQ8ePHde7cOYWEhJj7vL29VblyZW3dulXt2rVLVjcuLk6//fabBg8ebG5zcHBQSEiItm7dmuLxbt68qZs3b5qPY2JiJEnx8fGKj49PM1bgSUFfAAAAAAAAsE9P8vc+D3rudpcAuXXrlp577jkFBARIkkqVKpWhNho1aqSXX35ZkjR06FB9+OGHqlixolq3bi1JGjRokKpWrarIyEj5+/vfs734+HjNmDFDlStXliQtWLBAxYsX1/bt21WpUiWNGDFCb731ljp16iRJKlSokN577z0NHDhQw4YNk6+vr1xcXOTm5mYeLyIiQnv27NHx48eVP39+SdJnn32mkiVLaseOHapYsaKk28mGzz77TL6+vpKkX375Rdu3b1dUVJRcXFwkSRMmTNDy5cu1dOlS9ejRQxUqVNCuXbvSPCc/Pz9Jtxdnv/PxnfuT9t3twoULSkhISLHOgQMHUqwzZswYjRgxItn2tWvXyt3dPc1YgSdFWtPOAQAAAAAA4PEVHh5u6xBs5tq1aw9U364SIGXKlFG9evVUqlQphYaGqkGDBmrVqpWyZcuW7jZKly5t/n/Sl/R3JlGStkVFRaUrAZIlSxYzISFJxYoVk4+Pj/bv369KlSpp9+7d2rx5s0aNGmWWSUhI0I0bN3Tt2rUUv+Dfv3+/8ufPbyY/JKlEiRJmu0nHCwgIMJMfkrR7925dvXpVOXLksGrv+vXrOnr0qCTJzc1NRYoUued5PUqDBw9W//79zccxMTHKnz+/GjRoIC8vLxtGBvx3xMbG2joEAAAAAAAAPASNGjWydQg2kzQb0P2yqwSIo6OjIiIitGXLFq1du1bTp0/XkCFDtG3bNjk4OCSbCiul4TNOTk7m/ydNcZXStsTExEyJ+erVqxoxYoSee+65ZPuS1u24Xx4eHsmOlTt3bqtpspL4+PhIUoamwEpKAEVGRip37tzm/sjISAUHB6dYN2fOnHJ0dLRarySpTmoJJRcXF3PEyp2cnJysnhvgSUZfAAAAAAAAsE9P8vc+D3rudpUAkW4nKKpXr67q1atr6NChCggI0LfffitfX1+dPXvWLJeQkKC//vpLdevWfajx3Lp1Szt37lSlSpUkSQcPHtTly5dVvHhxSVK5cuV08ODBDI26KF68uE6fPq3Tp0+bo0D27duny5cvq0SJEqnWK1eunM6dO6csWbKoYMGCKZbJyBRYgYGB8vf31/r1682ER0xMjLZt26ZXX301xbrOzs4qX7681q9fr+bNm0u6nUxav369evXqleZxAQAAAAAAAABIL7tKgGzbtk3r169XgwYNlCtXLm3btk3nz59X8eLF5eHhof79++v7779X4cKFNWnSJF2+fPmhx+Tk5KTevXtr2rRpypIli3r16qUqVaqYCZGhQ4eqSZMmKlCggFq1aiUHBwft3r1bf/31l95///0U2wwJCVGpUqXUoUMHTZkyRbdu3dJrr72m2rVrq0KFCqnGEhISoqpVq6p58+YaN26cnnrqKZ05c0bff/+9WrRooQoVKmRoCiyLxaK+ffvq/fffV1BQkAIDA/Xuu+8qT548ZnJDkurVq6cWLVqYCY7+/furU6dOqlChgipVqqQpU6YoNjZWXbp0SedVBQAAAAAAAAAgbXaVAPHy8tLPP/+sKVOmKCYmRgEBAZo4caLCwsIUHx+v3bt3q2PHjsqSJYv69ev30Ed/SJK7u7sGDRqk9u3b659//lHNmjU1d+5cc39oaKhWrVqlkSNHauzYsXJyclKxYsXUrVu3VNu0WCxasWKFevfurVq1asnBwUENGzbU9OnT04zFYrEoPDxcQ4YMUZcuXXT+/Hn5+/urVq1ayRYlT6+BAwcqNjZWPXr00OXLl1WjRg2tWbPGavquo0eP6sKFC+bjtm3b6vz58xo6dKjOnTun4OBgrVmz5r5jAAAAAAAAAADgbhbj7oUxgP+4mJgYeXt7Kzo6mkXQgf+JjY2Vp6enJOnrPWfl6u5xjxoAAAAAAAB4HDQplNXWIdjMg34X7PAQYgIAAAAAAAAAALApEiAPICwsTJ6enin+jR492tbhAQAAAAAAAADwxLKrNUAetU8++UTXr19PcV/27NkfcTQAAAAAAAAAACAJCZAHkDdvXluHAAAAAAAAAAAAUsAUWAAAAAAAAAAAwO6QAAEAAAAAAAAAAHaHBAgAAAAAAAAAALA7JEAAAAAAAAAAAIDdYRF0ALAzIflc5eOT1dZhAE+c+Ph4hYeHq1GjRnJycrJ1OMAThz4I2BZ9ELAt+iBgW/TB/y5GgAAAAAAAAAAAALtDAgQAAAAAAAAAANgdEiAAAAAAAAAAAMDukAABAAAAAAAAAAB2hwQIAAAAAAAAAACwOyRAAAAAAAAAAACA3cli6wAAAJlr3d835Hrxiq3DAJ5IjqWe0Q+nb0i6YetQ/pOaFMpq6xAAAAAAAE8QRoAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIBkohMnTshisWjXrl2plpk/f758fHwe+FgbN26UxWLR5cuXH/qxAAAAAAAAAAB43JAAeUxVq1ZNZ8+elbe3t03j+PPPP1WzZk25uroqf/78Gjdu3D3rnDp1So0bN5a7u7ty5cqlAQMG6NatW48gWgAAAAAAAADAkyKLrQNAxsXHx8vZ2Vn+/v42jSMmJkYNGjRQSEiIZs+erT179uill16Sj4+PevTokWKdhIQENW7cWP7+/tqyZYvOnj2rjh07ysnJSaNHj37EZwAAAAAAAAAAsFeMALkPiYmJGjdunIoUKSIXFxcVKFBAo0aNMvcfO3ZMdevWlbu7u8qUKaOtW7em2d6HH36owoULy9nZWUWLFtXChQut9lssFn344Ydq2rSpPDw8NGrUqBSnwJo/f74KFCggd3d3tWjRQv/++2+yY61YsULlypWTq6urChUqpBEjRtz36IvFixcrLi5On376qUqWLKl27dqpT58+mjRpUqp11q5dq3379mnRokUKDg5WWFiY3nvvPc2cOVNxcXH3FQcAAAAAAAAAAHdjBMh9GDx4sD7++GNNnjxZNWrU0NmzZ3XgwAFz/5AhQzRhwgQFBQVpyJAhev7553XkyBFlyZL8cn/77bd6/fXXNWXKFIWEhGjVqlXq0qWL8uXLp7p165rlhg8frg8++EBTpkxRlixZdOzYMat2tm3bpq5du2rMmDFq3ry51qxZo2HDhlmV2bRpkzp27Khp06apZs2aOnr0qDlSI6lsWFiYNm3alOq5BwQEaO/evZKkrVu3qlatWnJ2djb3h4aGauzYsbp06ZKyZcuWrP7WrVtVqlQp+fn5WdV59dVXtXfvXpUtWzZZnZs3b+rmzZvm45iYGEm3R8LEx8enGivwJKEvAHgc8FqFhynp/uI+A2yDPgjYFn0QsC364MPzoNfUYhiGkUmxPBGuXLkiX19fzZgxQ926dbPad+LECQUGBuqTTz5R165dJUn79u1TyZIltX//fhUrVkzz589X3759zZEb1atXV8mSJfXRRx+Z7bRp00axsbH6/vvvJd0eAdK3b19NnjzZLLNx40bVrVtXly5dko+Pj9q3b6/o6GizjiS1a9dOa9asMY8VEhKievXqafDgwWaZRYsWaeDAgTpz5owk6Z9//tH169dTPX8nJycFBARIkho0aKDAwEDNmTPH3J90vvv27VPx4sWT1e/Ro4dOnjypH374wdx27do1eXh4KDw8XGFhYcnqDB8+XCNGjEi2/fPPP5e7u3uqsQJPkhs3bqhdu3aSpK/3nJWru4eNIwKA5BL2bLB1CAAAAACAx8i1a9fM7769vLwyXJ8RIBm0f/9+3bx5U/Xq1Uu1TOnSpc3/z507tyQpKipKxYoVS7G9u9fLqF69uqZOnWq1rUKFCveMq0WLFlbbqlatqjVr1piPd+/erc2bN1tN15WQkKAbN27o2rVrcnd3V968edM8ji0MHjxY/fv3Nx/HxMQof/78atCgwX3d9IA9io2NtXUIAHBPjRo1snUIsGPx8fGKiIhQ/fr15eTkZOtwgCcOfRCwLfogYFv0wYcnaTag+0UCJIPc3NzuWebOm9xisUi6vW7Ig/DwePBfc1+9elUjRozQc889l2yfq6urpIxNgeXv76/IyEir/UmPU1ug3d/fX9u3b89QHRcXF7m4uCTb7uTkxAsK8D/0BQCPA16r8CjwGRGwLfogYFv0QcC26IOZ70GvJwmQDAoKCpKbm5vWr1+fbAqs+1G8eHFt3rxZnTp1Mrdt3rxZJUqUyHA727Zts9r266+/Wj0uV66cDh48qCJFiqTazieffHLPKbCSVK1aVUOGDFF8fLy5PSIiQkWLFk1x/Y+kOqNGjVJUVJRy5cpl1vHy8srwOQMAAAAAAAAAkBoSIBnk6uqqQYMGaeDAgXJ2dlb16tV1/vx57d27N81psVIzYMAAtWnTRmXLllVISIi+++47ffPNN1q3bl2G2unTp4+qV6+uCRMmqFmzZvrhhx+spr+SpKFDh6pJkyYqUKCAWrVqJQcHB+3evVt//fWX3n//fUnK0BRY7du314gRI9S1a1cNGjRIf/31l6ZOnWq1Vsm3336rwYMHm4vEN2jQQCVKlNCLL76ocePG6dy5c3rnnXfUs2fPFEd5AAAAAAAAAABwPxxsHcDj6N1339Ubb7yhoUOHqnjx4mrbtq2ioqLuq63mzZtr6tSpmjBhgkqWLKk5c+Zo3rx5qlOnTobaqVKlij7++GNNnTpVZcqU0dq1a/XOO+9YlQkNDdWqVau0du1aVaxYUVWqVNHkyZPNRc0zytvbW2vXrtXx48dVvnx585rcuaZJdHS0Dh48aD52dHTUqlWr5OjoqKpVq+qFF15Qx44dNXLkyPuKAQAAAAAAAACAlFgMwzBsHQSQETExMfL29lZ0dDSLoAP/ExsbK09PT0nS13vOytX9wdcNAoDM1qRQVluHADsWHx+v8PBwNWrUiHmXARugDwK2RR8EbIs++PA86HfBjAABAAAAAAAAAAB2hwQIAAAAAAAAAACwOyRAAAAAAAAAAACA3SEBAgAAAAAAAAAA7A4JEAAAAAAAAAAAYHdIgAAAAAAAAAAAALtDAgQAAAAAAAAAANgdEiAAAAAAAAAAAMDuZLF1AACAzBWSz1U+PlltHQbwxImPj1d4eLgaNWokJycnW4cDAAAAAMATjxEgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3stg6AABA5lr39w25Xrxi6zCQiZoUymrrEAAAAAAAAB47jAABAAAAAAAAAAB2hwQIAAAAAAAAAACwOyRAAAAAAAAAAACA3SEBAgAAAAAAAAAA7A4JEAAAAAAAAAAAYHdIgAAAAAAAAAAAALtDAgQAAAAAAAAAANgdEiAAAAAAAAAAAMDukADJZCdOnJDFYtGuXbskSRs3bpTFYtHly5dtHgsAAAAAAAAAAE8KEiB2LH/+/Dp79qyefvrph3YMwzA0dOhQ5c6dW25ubgoJCdHhw4fvWW/mzJkqWLCgXF1dVblyZW3fvv2hxQgAAAAAAAAAePKQALFjjo6O8vf3V5YsWR7aMcaNG6dp06Zp9uzZ2rZtmzw8PBQaGqobN26kWmfJkiXq37+/hg0bpt9//11lypRRaGiooqKiHlqcAAAAAAAAAIAnCwmQ+7BmzRrVqFFDPj4+ypEjh5o0aaKjR4+mWWfz5s0qXbq0XF1dVaVKFf3111/mvuHDhys4ONiq/JQpU1SwYEHzcefOndW8eXONHj1afn5+8vHx0ciRI3Xr1i0NGDBA2bNnV758+TRv3jyzTmrTca1fv14VKlSQu7u7qlWrpoMHD97XdTAMQ1OmTNE777yjZs2aqXTp0vrss8905swZLV++PNV6kyZNUvfu3dWlSxeVKFFCs2fPlru7uz799NP7igMAAAAAAAAAgLs9vKEBdiw2Nlb9+/dX6dKldfXqVQ0dOlQtWrRIc62NAQMGaOrUqfL399fbb7+tZ599VocOHZKTk1O6j7thwwbly5dPP//8szZv3qyuXbtqy5YtqlWrlrZt26YlS5bo5ZdfVv369ZUvX75U2xkyZIgmTpwoX19fvfLKK3rppZe0efNmSdKmTZsUFhaWZhxz5sxRhw4ddPz4cZ07d04hISHmPm9vb1WuXFlbt25Vu3btktWNi4vTb7/9psGDB5vbHBwcFBISoq1bt6Z4vJs3b+rmzZvm45iYGElSfHy84uPj04wVeFLQF+wbz+/jIel54vkCbIM+CNgWfRCwLfogYFv0wYfnQa8pCZD70LJlS6vHn376qXx9fbVv3z55enqmWGfYsGGqX7++JGnBggXKly+fvv32W7Vp0ybdx82ePbumTZsmBwcHFS1aVOPGjdO1a9f09ttvS5IGDx6sDz74QL/88kuKyYcko0aNUu3atSVJb731lho3bqwbN27I1dVVFSpUuOei6X5+fpKkc+fOWT2+c3/SvrtduHBBCQkJKdY5cOBAinXGjBmjESNGJNu+du1aubu7pxkr8KRIa9o5PP7Cw8NtHQIyICIiwtYhAE80+iBgW/RBwLbog4Bt0Qcz37Vr1x6oPgmQ+3D48GENHTpU27Zt04ULF5SYmChJOnXqlEqUKJFinapVq5r/nz17dhUtWlT79+/P0HFLliwpB4f/n7XMz8/PaoFzR0dH5ciR455raZQuXdr8/9y5c0uSoqKiVKBAAbm5ualIkSIZiuthGzx4sPr3728+jomJUf78+dWgQQN5eXnZMDLgvyM2NtbWIeAhatSoka1DQDrEx8crIiJC9evXz9AITwCZgz4I2BZ9ELAt+iBgW/TBhydpNqD7RQLkPjz77LMKCAjQxx9/rDx58igxMVFPP/204uLi7qs9BwcHGYZhtS2loT13dx6LxZLitqSETGrurGOxWCTJrJORKbD8/f0lSZGRkWYiJenx3WuaJMmZM6ccHR0VGRlptT0yMtJs724uLi5ycXFJ8Tx4QQFuoy/YN57fxwvvT4Bt0QcB26IPArZFHwRsiz6Y+R70epIAyaB///1XBw8e1Mcff6yaNWtKkn755Zd71vv1119VoEABSdKlS5d06NAhFS9eXJLk6+urc+fOyTAMMyFxr2moHpaMTIEVGBgof39/rV+/3kx4xMTEaNu2bXr11VdTrOvs7Kzy5ctr/fr1at68uaTbyZf169erV69emXUaAAAAAAAAAIAnHAmQDMqWLZty5Mihjz76SLlz59apU6f01ltv3bPeyJEjlSNHDvn5+WnIkCHKmTOnmQCoU6eOzp8/r3HjxqlVq1Zas2aNVq9ebZPpnTIyBZbFYlHfvn31/vvvKygoSIGBgXr33XeVJ08e89wkqV69emrRooWZ4Ojfv786deqkChUqqFKlSpoyZYpiY2PVpUuXh3FKAAAAAAAAAIAnkMO9i+BODg4O+vLLL/Xbb7/p6aefVr9+/TR+/Ph71vvggw/0+uuvq3z58jp37py+++47OTs7S5KKFy+uWbNmaebMmSpTpoy2b9+uN99882GfSqYYOHCgevfurR49eqhixYq6evWq1qxZI1dXV7PM0aNHdeHCBfNx27ZtNWHCBA0dOlTBwcHatWuX1qxZk2xhdAAAAAAAAAAA7pfFuHvxCeA/LiYmRt7e3oqOjmYRdOB/YmNj5enpKUn6es9Zubp72DgiZKYmhbLaOgSkQ3x8vMLDw9WoUSPmfAVsgD4I2BZ9ELAt+iBgW/TBh+dBvwtmBAgAAAAAAAAAALA7JEAAAAAAAAAAAIDdIQECAAAAAAAAAADsDgkQAAAAAAAAAABgd0iAAAAAAAAAAAAAu0MCBAAAAAAAAAAA2B0SIAAAAAAAAAAAwO6QAAEAAAAAAAAAAHYni60DAABkrpB8rvLxyWrrMAAAAAAAAACbYgQIAAAAAAAAAACwOyRAAAAAAAAAAACA3SEBAgAAAAAAAAAA7A4JEAAAAAAAAAAAYHdIgAAAAAAAAAAAALtDAgQAAAAAAAAAANidLLYOAACQudb9fUOuF6/YOgxkoiaFsto6BAAAAAAAgMcOI0AAAAAAAAAAAIDdIQECAAAAAAAAAADsDgkQAAAAAAAAAABgd0iAAAAAAAAAAAAAu0MCBAAAAAAAAAAA2B0SIAAAAAAAAAAAwO6QAAEAAAAAAAAAAHaHBAgAAAAAAAAAALA7JED+g06cOCGLxaJdu3ZJkjZu3CiLxaLLly/bNC4AAAAAAAAAAB4XJEAeA9WqVdPZs2fl7e1t61CS2bhxo8qVKycXFxcVKVJE8+fPv2edP//8UzVr1pSrq6vy58+vcePGPfxAAQAAAAAAAABPFBIgjwFnZ2f5+/vLYrHYOhQrx48fV+PGjVW3bl3t2rVLffv2Vbdu3fTDDz+kWicmJkYNGjRQQECAfvvtN40fP17Dhw/XRx999AgjBwAAAAAAAADYOxIgmWTp0qUqVaqU3NzclCNHDoWEhCg2NlaJiYkaOXKk8uXLJxcXFwUHB2vNmjVWdbdv366yZcvK1dVVFSpU0B9//GG1/+4psIYPH67g4GCrMlOmTFHBggXNx507d1bz5s01evRo+fn5ycfHRyNHjtStW7c0YMAAZc+eXfny5dO8efPu+5xnz56twMBATZw4UcWLF1evXr3UqlUrTZ48OdU6ixcvVlxcnD799FOVLFlS7dq1U58+fTRp0qT7jgMAAAAAAAAAgLtlsXUA9uDs2bN6/vnnNW7cOLVo0UJXrlzRpk2bZBiGpk6dqokTJ2rOnDkqW7asPv30UzVt2lR79+5VUFCQrl69qiZNmqh+/fpatGiRjh8/rtdffz1T4tqwYYPy5cunn3/+WZs3b1bXrl21ZcsW1apVS9u2bdOSJUv08ssvq379+sqXL58kqWTJkjp58mSqbdasWVOrV6+WJG3dulUhISFW+0NDQ9W3b99U62/dulW1atWSs7OzVZ2xY8fq0qVLypYtW7I6N2/e1M2bN83HMTExkqT4+HjFx8ff+0IATwD6gn3j+X08JD1PPF+AbdAHAduiDwK2RR8EbIs++PA86DUlAZIJzp49q1u3bum5555TQECAJKlUqVKSpAkTJmjQoEFq166dJGns2LH68ccfNWXKFM2cOVOff/65EhMTNXfuXLm6uqpkyZL6+++/9eqrrz5wXNmzZ9e0adPk4OCgokWLaty4cbp27ZrefvttSdLgwYP1wQcf6JdffjHjCw8PT/OmcnNzM///3Llz8vPzs9rv5+enmJgYXb9+3arsnXUCAwOT1Unal1ICZMyYMRoxYkSy7WvXrpW7u3uqsQJPkhs3btg6BDxE4eHhtg4BGRAREWHrEIAnGn0QsC36IGBb9EHAtuiDme/atWsPVJ8ESCYoU6aM6tWrp1KlSik0NFQNGjRQq1at5OjoqDNnzqh69epW5atXr67du3dLkvbv36/SpUvL1dXV3F+1atVMiatkyZJycPj/Wc78/Pz09NNPm48dHR2VI0cORUVFmduSEjj/JYMHD1b//v3NxzExMcqfP78aNGggLy8vG0YG/HfExsbaOgQ8RI0aNbJ1CEiH+Ph4RUREqH79+nJycrJ1OMAThz4I2BZ9ELAt+iBgW/TBhydpNqD7RQIkEzg6OioiIkJbtmzR2rVrNX36dA0ZMuShZfwcHBxkGIbVtpRGbdzd2SwWS4rbEhMTzccZmQLL399fkZGRVvsjIyPl5eWV4uiPtOok7UuJi4uLXFxckm13cnLiBQX4H/qCfeP5fbzw/gTYFn0QsC36IGBb9EHAtuiDme9BrycJkExisVhUvXp1Va9eXUOHDlVAQIDWr1+vPHnyaPPmzapdu7ZZdvPmzapUqZIkqXjx4lq4cKFu3LhhjgL59ddf0zyWr6+vzp07J8MwZLFYJEm7du3KlPPIyBRYVatWTTYtS0RERJojWKpWraohQ4YoPj7evHkjIiJUtGjRFKe/AgAAAAAAAADgfjjcuwjuZdu2bRo9erR27typU6dO6ZtvvtH58+dVvHhxDRgwQGPHjtWSJUt08OBBvfXWW9q1a5e50Hn79u1lsVjUvXt37du3T+Hh4ZowYUKax6tTp47Onz+vcePG6ejRo5o5c6Y5KuNBBQQEqEiRIqn+5c2b1yz7yiuv6NixYxo4cKAOHDigWbNm6auvvlK/fv3MMjNmzFC9evXMx+3bt5ezs7O6du2qvXv3asmSJZo6darVFFcAAAAAAAAAADwoEiCZwMvLSz///LMaNWqkp556Su+8844mTpyosLAw9enTR/3799cbb7yhUqVKac2aNVq5cqWCgoIkSZ6envruu++0Z88elS1bVkOGDNHYsWPTPF7x4sU1a9YszZw5U2XKlNH27dv15ptvPopTtRIYGKjvv/9eERERKlOmjCZOnKhPPvlEoaGhZpkLFy7o6NGj5mNvb2+tXbtWx48fV/ny5fXGG29o6NCh6tGjxyOPHwAAAAAAAABgvyzG3YtJAP9xMTEx8vb2VnR0NIugA/8TGxsrT09PSdLXe87K1d3DxhEhMzUplNXWISAd4uPjFR4erkaNGjHnK2AD9EHAtuiDgG3RBwHbog8+PA/6XTAjQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDtZbB0AACBzheRzlY9PVluHAQAAAAAAANgUI0AAAAAAAAAAAIDdIQECAAAAAAAAAADsDgkQAAAAAAAAAABgd0iAAAAAAAAAAAAAu0MCBAAAAAAAAAAA2B0SIAAAAAAAAAAAwO5ksXUAAIDMte7vG3K9eMXWYdilJoWy2joEAAAAAAAApBMjQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHRIgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQB6yggULasqUKbYOAwAAAAAAAACAJwoJEDwQwzA0dOhQ5c6dW25ubgoJCdHhw4fvWW/mzJkqWLCgXF1dVblyZW3fvv0RRAsAAAAAAAAAeFKQAMEDGTdunKZNm6bZs2dr27Zt8vDwUGhoqG7cuJFqnSVLlqh///4aNmyYfv/9d5UpU0ahoaGKiop6hJEDAAAAAAAAAOwZCZAHdOXKFXXo0EEeHh7KnTu3Jk+erDp16qhv377Jyp44cUIWi0W7du0yt12+fFkWi0UbN240t+3du1dNmjSRl5eXsmbNqpo1a+ro0aOSpMTERI0cOVL58uWTi4uLgoODtWbNGrNuXFycevXqpdy5c8vV1VUBAQEaM2aM1fG6desmX19feXl56ZlnntHu3bvv69wNw9CUKVP0zjvvqFmzZipdurQ+++wznTlzRsuXL0+13qRJk9S9e3d16dJFJUqU0OzZs+Xu7q5PP/30vuIAAAAAAAAAAOBuWWwdwOOuf//+2rx5s1auXCk/Pz8NHTpUv//+u4KDg++rvX/++Ue1atVSnTp1tGHDBnl5eWnz5s26deuWJGnq1KmaOHGi5syZo7Jly+rTTz9V06ZNtXfvXgUFBWnatGlauXKlvvrqKxUoUECnT5/W6dOnzfZbt24tNzc3rV69Wt7e3pozZ47q1aunQ4cOKXv27Nq0aZPCwsLSjHHOnDnq0KGDjh8/rnPnzikkJMTc5+3trcqVK2vr1q1q165dsrpxcXH67bffNHjwYHObg4ODQkJCtHXr1hSPd/PmTd28edN8HBMTI0mKj49XfHx8Oq4qYP/oC48G1xlpSbo/uE8A26APArZFHwRsiz4I2BZ98OF50GtKAuQBXLlyRQsWLNDnn3+uevXqSZLmzZunPHny3HebM2fOlLe3t7788ks5OTlJkp566ilz/4QJEzRo0CAzuTB27Fj9+OOPmjJlimbOnKlTp04pKChINWrUkMViUUBAgFn3l19+0fbt2xUVFSUXFxezveXLl2vp0qXq0aOHKlSoYDVCJSV+fn6SpHPnzlk9vnN/0r67XbhwQQkJCSnWOXDgQIp1xowZoxEjRiTbvnbtWrm7u6cZK/CkSGvaOWSe8PBwW4eAx0BERIStQwCeaPRBwLbog4Bt0QcB26IPZr5r1649UH0SIA/g2LFjio+PV6VKlcxt3t7eKlq06H23uWvXLtWsWdNMftwpJiZGZ86cUfXq1a22V69e3ZzGqnPnzqpfv76KFi2qhg0bqkmTJmrQoIEkaffu3bp69apy5MhhVf/69evmFFtubm4qUqTIfcf/MAwePFj9+/c3H8fExCh//vxq0KCBvLy8bBgZ8N8RGxtr6xCeCI0aNbJ1CPgPi4+PV0REhOrXr5/i+ziAh4s+CNgWfRCwLfogYFv0wYcnaTag+0UC5BFycLi95IphGOa2u4fwuLm5PdAxypUrp+PHj2v16tVat26d2rRpo5CQEC1dulRXr15V7ty5rdYbSeLj4yNJGZoCy9/fX5IUGRmp3Llzm/sjIyNTnQIsZ86ccnR0VGRkpNX2yMhIs727ubi4mCNW7uTk5MQLCvA/9IVHg+uM9OD9CbAt+iBgW/RBwLbog4Bt0Qcz34NeTxIgD6BQoUJycnLSjh07VKBAAUlSdHS0Dh06pFq1aiUr7+vrK0k6e/asypYtK0nJppsqXbq0FixYoPj4+GRPrpeXl/LkyaPNmzerdu3a5vbNmzdbjULx8vJS27Zt1bZtW7Vq1UoNGzbUxYsXVa5cOZ07d05ZsmRRwYIFUzynjEyBFRgYKH9/f61fv95MeMTExGjbtm169dVXU6zr7Oys8uXLa/369WrevLmk2wu7r1+/Xr169UrzuAAAAAAAAAAApBcJkAeQNWtWderUSQMGDFD27NmVK1cuDRs2TA4ODrJYLMnKu7m5qUqVKvrggw8UGBioqKgovfPOO1ZlevXqpenTp6tdu3YaPHiwvL299euvv6pSpUoqWrSoBgwYoGHDhqlw4cIKDg7WvHnztGvXLi1evFiSNGnSJOXOnVtly5aVg4ODvv76a/n7+8vHx0chISGqWrWqmjdvrnHjxumpp57SmTNn9P3336tFixaqUKFChqbAslgs6tu3r95//30FBQUpMDBQ7777rvLkyWMmNySpXr16atGihZng6N+/vzp16qQKFSqoUqVKmjJlimJjY9WlS5f7fCYAAAAAAAAAALBGAuQBTZo0Sa+88oqaNGkiLy8vDRw4UKdPn5arq2uK5T/99FN17dpV5cuXV9GiRTVu3DhzjQ5JypEjhzZs2KABAwaodu3acnR0VHBwsLnuR58+fRQdHa033nhDUVFRKlGihFauXKmgoCBJt5My48aN0+HDh+Xo6KiKFSsqPDzcnH4rPDxcQ4YMUZcuXXT+/Hn5+/urVq1ayRYlT6+BAwcqNjZWPXr00OXLl1WjRg2tWbPG6vyPHj2qCxcumI/btm2r8+fPa+jQoTp37pyCg4O1Zs2a+44BAAAAAAAAAIC7WYw7F6TAA4uNjVXevHk1ceJEde3a1dbh2KWYmBh5e3srOjqaRdCB/4mNjZWnp6ck6es9Z+Xq7mHjiOxTk0JZbR0C/sPi4+MVHh6uRo0aMecrYAP0QcC26IOAbdEHAduiDz48D/pdMCNAHtAff/yhAwcOqFKlSoqOjtbIkSMlSc2aNbNxZAAAAAAAAAAAPLlIgGSCCRMm6ODBg+YC35s2bVLOnDltHRYAAAAAAAAAAE8sEiAPqGzZsvrtt99sHQYAAAAAAAAAALiDg60DAAAAAAAAAAAAyGwkQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7k8XWAQAAMldIPlf5+GS1dRgAAAAAAACATTECBAAAAAAAAAAA2B0SIAAAAAAAAAAAwO6QAAEAAAAAAAAAAHaHBAgAAAAAAAAAALA7JEAAAAAAAAAAAIDdIQECAAAAAAAAAADsThZbBwAAyFzr/r4h14tXbB3GY69Joay2DgEAAAAAAAAPgBEgAAAAAAAAAADA7pAAAQAAAAAAAAAAdocECAAAAAAAAAAAsDskQAAAAAAAAAAAgN0hAQIAAAAAAAAAAOwOCRAAAAAAAAAAAGB3SIAAAAAAAAAAAAC7QwIEAAAAAAAAAADYHbtJgNSpU0d9+/a1dRj3pXPnzmrevHm6y2/cuFEWi0WXL19Otcz8+fPl4+PzwLEBAAAAAAAAAPA4spsECKy1bdtWhw4deqjHuHjxojp06CAvLy/5+Pioa9euunr1app1bty4oZ49eypHjhzy9PRUy5YtFRkZ+VDjBAAAAAAAAAA8eUiA2Ck3NzflypXroR6jQ4cO2rt3ryIiIrRq1Sr9/PPP6tGjR5p1+vXrp++++05ff/21fvrpJ505c0bPPffcQ40TAAAAAAAAAPDksasESGJiogYOHKjs2bPL399fw4cPN/ddvnxZ3bp1k6+vr7y8vPTMM89o9+7d5v7hw4crODhYn376qQoUKCBPT0+99tprSkhI0Lhx4+Tv769cuXJp1KhRVsc8deqUmjVrJk9PT3l5ealNmzbJRjS8//77ypUrl7Jmzapu3brprbfeUnBwcKrncfPmTfXp00e5cuWSq6uratSooR07diQrt3nzZpUuXVqurq6qUqWK/vrrL3Pf3VNgJZ3fwoULVbBgQXl7e6tdu3a6cuVKOq+utf3792vNmjX65JNPVLlyZdWoUUPTp0/Xl19+qTNnzqRYJzo6WnPnztWkSZP0zDPPqHz58po3b562bNmiX3/99b7iAAAAAAAAAAAgJVlsHUBmWrBggfr3769t27Zp69at6ty5s6pXr6769eurdevWcnNz0+rVq+Xt7a05c+aoXr16OnTokLJnzy5JOnr0qFavXq01a9bo6NGjatWqlY4dO6annnpKP/30k7Zs2aKXXnpJISEhqly5shITE83kx08//aRbt26pZ8+eatu2rTZu3ChJWrx4sUaNGqVZs2apevXq+vLLLzVx4kQFBgameh4DBw7UsmXLtGDBAgUEBGjcuHEKDQ3VkSNHzFglacCAAZo6dar8/f319ttv69lnn9WhQ4fk5OSUYrtHjx7V8uXLtWrVKl26dElt2rTRBx98YCZ1Ro8erdGjR6d5jfft26cCBQpo69at8vHxUYUKFcx9ISEhcnBw0LZt29SiRYtkdX/77TfFx8crJCTE3FasWDGzvSpVqqR4zJs3b+rmzZvm45iYGElSfHy84uPj04wXeFLQFzIf1xQZlXTPcO8AtkEfBGyLPgjYFn0QsC364MPzoNfUrhIgpUuX1rBhwyRJQUFBmjFjhtavXy83Nzdt375dUVFRcnFxkSRNmDBBy5cv19KlS81pmxITE/Xpp58qa9asKlGihOrWrauDBw8qPDxcDg4OKlq0qMaOHasff/xRlStX1vr167Vnzx4dP35c+fPnlyR99tlnKlmypHbs2KGKFStq+vTp6tq1q7p06SJJGjp0qNauXZvqWhmxsbH68MMPNX/+fIWFhUmSPv74Y0VERGju3LkaMGCAWXbYsGGqX7++pNvJn3z58unbb79VmzZtUmw7MTFR8+fPV9asWSVJL774otavX28mQF555ZVU6ybJkyePJOncuXPJptjKkiWLsmfPrnPnzqVY99y5c3J2dk62OLufn1+qdSRpzJgxGjFiRLLta9eulbu7e5rxAk+KGzdu2DoEuxMeHm7rEPCYioiIsHUIwBONPgjYFn0QsC36IGBb9MHMd+3atQeqb3cJkDvlzp1bUVFR2r17t65evaocOXJY7b9+/bqOHj1qPi5YsKCZHJBufzHv6OgoBwcHq21RUVGSbk8DlT9/fjP5IUklSpSQj4+P9u/fr4oVK+rgwYN67bXXrI5bqVIlbdiwIcVzOHr0qOLj41W9enVzm5OTkypVqqT9+/dbla1atar5/9mzZ1fRokWTlbnT3eeXdH3ubOPOESb/FYMHD1b//v3NxzExMcqfP78aNGggLy8vG0YG/HfExsbaOgS706hRI1uHgMdMfHy8IiIiVL9+/VRHYwJ4eOiDgG3RBwHbog8CtkUffHiSZgO6X3aVALn75rJYLEpMTNTVq1eVO3duc1qqO905GiGl+qm1+Ti617lkZAosf39/q+SJJN26dUsXL16Uv79/inX9/f0VFxeny5cvW133yMjIVOtIkouLizly5+7z4QUFuI2+kPm4prhfvD8BtkUfBGyLPgjYFn0QsC36YOZ70OtpVwmQ1JQrV07nzp1TlixZVLBgwUxrt3jx4jp9+rROnz5tjgLZt2+fLl++rBIlSkiSihYtqh07dqhjx45mvZQWNE9SuHBhOTs7a/PmzQoICJB0O4O4Y8cO9e3b16rsr7/+qgIFCkiSLl26pEOHDql48eL3fT4ZmQKratWqunz5sn777TeVL19ekrRhwwYlJiaqcuXKKdYtX768nJyctH79erVs2VKSdPDgQZ06dcpqNAsAAAAAAAAAAA/qiUiAhISEqGrVqmrevLnGjRunp556SmfOnNH333+vFi1aWC3kndF2S5UqpQ4dOmjKlCm6deuWXnvtNdWuXdtss3fv3urevbsqVKigatWqacmSJfrzzz9VqFChFNv08PDQq6++qgEDBih79uwqUKCA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Sk5OtgQg3t7epQIKo02bNk1xcXGW7dzcXPn5+alfv35yd3c3sDLg5pGfn2953bt370otsQegasxms1JTUxUeHi5HR0ejywFqHXoQMBY9CBiLHgSMRQ/WnEurAVUWAUgVHT9+XIMGDdITTzyhefPmycvLS1988YWio6NVVFRUbXco2Nvba/Pmzbr//vvVq1cvffzxx2WGICUlJXr11Vf12GOPqU6dOlb7GjVqpKCgIKuxwMBAvfvuu5btiiyB5evrq8zMTKt9J06csOwri6+vr06ePGk1dv78eZ06darcOU5OTnJycio17ujoyB8U4H8u7wV6AzAWPQgYix4EjEUPAsaiBwFj0YPVr6qfJw9Bv0KLFi3k6Oio3bt3W8ZOnz6t7777rszj9+7dq+LiYiUmJuqee+7RnXfeWeph3q1atdKePXusxq7cvh5OTk567733dPfdd6tXr1769ttvSx3z6aef6vvvv1d0dHSpfd26ddORI0esxr777jur54TMmTNH+/fvv+rPJaGhoTpw4IBVoJGamip3d/dSQcvlc3777Tft3bvXMpaenq7i4mKru24AAAAAAAAAAKgK7gC5gqurq6KjozV58mQ1aNBA3t7emjFjhuzsys6KAgICZDabtWzZMg0ePFg7d+5UcnKy1TFPPvmk7r33XiUlJWnw4MFKT0/X1q1bZTKZKlyfk5OT3n33XQ0bNky9evVSenq62rRpY9n/yiuvqEuXLmrbtm2puRMnTlTXrl313HPP6cEHH1RmZqZWrlyplStXWo6pyBJY/fr1U1BQkB577DEtWLBAOTk5evrppzV27FjLHRuZmZmKiopSWlqamjRposDAQPXv318xMTFKTk6W2WzWuHHj9NBDD6lx48YV/jwAAAAAAAAAACgLd4CU4YUXXlD37t01ePBg9e3bV2FhYerYsWOZx4aEhCgpKUnz589X27ZttX79eiUkJFgd061bNyUnJyspKUkhISHatm2bJk6cWOmHFNepU0fvvPOOunbtql69eungwYOSpDNnzujdd98t8+4PSbr77rv1/vvv680331Tbtm01d+5cLV68WCNGjKhUHfb29tqyZYvs7e0VGhqqRx99VFFRUZozZ47lmIKCAh05ckRms9kytn79erVu3Vp9+vTRwIEDFRYWZhXCAAAAAAAAAABQVaaSkpISo4uojWJiYnT48GF9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k+644w7NmzdPx48fl8lk0ltvvaUePXrI2dlZ69evlyStXr1agYGBcnZ2VuvWrbVixQqrc06dOlV33nmnXFxc1Lx5c82cOdMSnqxZs0bx8fH6+uuvZTKZZDKZLHc/XL4E1qXrv/fee+rVq5dcXFwUEhKijIwMy3WuXALr0p0lb7zxhvz9/eXh4aGHHnpIv//+u9X7TUhIULNmzVS3bl2FhITonXfeqfTnt2TJEvXv31+TJ09WYGCg5s6dqw4dOmj58uXlzklOTlazZs2UmJiowMBAjRs3Tg888IAWLVpU6ToAAAAAAAAAALiSg9EFGGnatGlatWqVFi1apLCwMGVnZ+vw4cOW/X/729+UmJio9u3bW0KQWbNmafny5Wrfvr2++uorxcTEqF69eho5cqQkyc3NTWvWrFHjxo114MABxcTEyM3NTVOmTNHw4cN18OBBbdu2TTt27JAkeXh4lFvfjBkztHDhQrVs2VIzZszQww8/rO+//14ODmX/Zzt69Kg2b96sLVu26PTp03rwwQf1/PPPa968eZKkhIQErVu3TsnJyWrZsqU+++wzPfroo2rYsKF69OghSXJ1db3qZ/boo48qOTlZkpSRkaG4uDir/REREVd9lklGRob69u1bas6ECROuel0AAAAAAAAAACqi1gYgv//+u5YsWaLly5dbwosWLVooLCxMx48flyRNmDBB999/v2XOM888o8TERMtYs2bN9O233+rll1+2nOPpp5+2HO/v769JkyZp48aNmjJliurWrStXV1c5ODjI19f3mjVOmjRJkZGRkqT4+Hi1adNG33//vVq3bl3m8cXFxVqzZo3c3NwkSY899pjS0tI0b948FRYW6rnnntOOHTsUGhoqSWrevLm++OILvfzyy5YAZP/+/Vetyd3d3fI6JydHPj4+Vvt9fHyUk5NT7vzy5uTm5urs2bOqW7duqTmFhYUqLCy0bOfm5kq6uCxZTS9NBtyK6A3AGJf6jv4DjEEPAsaiBwFj0YOAsejBmlPVz7TWBiCHDh1SYWGh+vTpU+4xnTp1srzOz8/X0aNHFR0drZiYGMv4+fPnre7ieOutt7R06VIdPXpUeXl5On/+vFVoUBF33XWX5XWjRo0kSSdPniw3APH397eEH5fmnDx5UpL0/fffq6CgQOHh4VZzioqK1L59e8t2QEBApWqtSQkJCYqPjy81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"
  }