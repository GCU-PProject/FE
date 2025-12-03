import type { LawItem } from '@/types/law';

export const mockLaws: LawItem[] = [
  {
    id: 1,
    country: '미국',
    countryCode: 'US',
    category: '교통',
    field: 'traffic',
    title: '도로교통법',
    subTitle: 'Traffic Law',
    description:
      '음주운전 기준 혈중알코올농도 0.08% 이상, 벌금 최대 $2,000 및 면허정지',
    updatedAt: '2024-03-15',
    sourceUrl: 'https://example.com/us/traffic-law',
    detailSections: [
      {
        id: '1',
        title: '목적',
        content:
          '이 법은 도로에서의 교통안전과 질서를 확보하고, 교통사고를 예방하여 국민의 생명과 재산을 보호함을 목적으로 한다.',
      },
      {
        id: '3',
        title: '음주운전 금지',
        content:
          '누구든지 혈중알코올농도 0.08% 이상의 상태에서 자동차를 운전하여서는 아니 된다. 이를 위반할 자는 다음 각 호의 처벌을 받는다.',
        bullets: [
          '초범: 최대 $2,000의 벌금 및 6개월 이하의 면허정지',
          '재범: 최대 $5,000의 벌금 및 1년 이하의 면허취소',
          '3회 이상: 중범죄로 간주되어 형사처벌 대상',
        ],
      },
      {
        id: '5',
        title: '과속 제한',
        content:
          '자동차 운전자는 다음 각 호의 속도를 초과하여 운전하여서는 아니 된다.',
        bullets: [
          '고속도로: 시속 65마일(약 105km/h)',
          '일반도로: 시속 55마일(약 88km/h)',
          '주거지역: 시속 25마일(약 40km/h)',
          '학교구역: 시속 15마일(약 24km/h)',
        ],
      },
      {
        id: '7',
        title: '안전벨트 착용 의무',
        content:
          '모든 탑승자는 주행 중 안전벨트를 착용하여야 한다. 16세 미만의 승객은 반드시 뒷좌석에 탑승하고 적절한 카시트 또는 부스터 시트를 사용하여야 한다.',
      },
      {
        id: '10',
        title: '핸드폰 사용 금지',
        content:
          '운전 중 손에 휴대전화를 들고 통화하거나 문자메시지를 작성하는 행위는 금지된다. 핸즈프리 장치를 사용하는 경우는 허용된다.',
      },
    ],
  },
  {
    id: 2,
    country: '일본',
    countryCode: 'JP',
    category: '교통',
    field: 'traffic',
    title: '道路交通法',
    subTitle: '도로교통법',
    description: '음주운전 시 5년 이하 징역 또는 100만엔 이하 벌금, 면허 취소',
    updatedAt: '2024-02-20',
    saved: true,
  },
  {
    id: 3,
    country: '독일',
    countryCode: 'DE',
    category: '교통',
    field: 'traffic',
    title: 'Straßenverkehrsgesetz',
    subTitle: '도로교통법',
    description:
      '혈중알코올농도 0.05% 이상 시 벌금 및 벌점, 0.11% 이상 시 형사처벌',
    updatedAt: '2024-04-10',
  },
  {
    id: 4,
    country: '싱가포르',
    countryCode: 'SG',
    category: '교통',
    field: 'traffic',
    title: 'Road Traffic Act',
    description:
      '음주운전 초범 최대 S$5,000 벌금 및 6개월 구금, 재범 시 가중처벌',
    updatedAt: '2024-04-01',
  },
  {
    id: 5,
    country: '태국',
    countryCode: 'TH',
    category: '교통',
    field: 'traffic',
    title: 'พระราชบัญญัติจราจรทางบก',
    subTitle: '도로교통법',
    description: '음주운전 시 최대 20,000 바트 벌금, 재범 시 1년 이하 구금',
    updatedAt: '2024-03-28',
  },
  {
    id: 6,
    country: '프랑스',
    countryCode: 'FR',
    category: '교통',
    field: 'traffic',
    title: 'Code de la route',
    subTitle: '도로법전',
    description:
      '혈중알코올농도 0.05% 이상 시 벌금 €135, 면허 정지 및 벌점 부과',
    updatedAt: '2024-02-14',
    saved: true,
  },
];
