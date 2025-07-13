import { Button, Table, type TableColumnsType } from "antd";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import type { TQueryParam } from "../../../types";

export type TTableData = Pick<
   TAcademicSemester,
   'name' | 'year' | 'startMonth' | 'endMonth'
>;

const AcademicSemester = () => {
   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
   const { data: semesterData, isFetching } = useGetAllAcademicSemesterQuery(params);
   const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year
   }))

   const columns: TableColumnsType<TTableData> = [
      {
         title: 'Name',
         key: 'name',
         dataIndex: 'name',
         filters: [
            {
               text: 'Autumn',
               value: 'Autumn',
            },
            {
               text: 'Fall',
               value: 'Fall',
            },
            {
               text: 'Summer',
               value: 'Summer',
            },
         ],
      },
      {
         title: 'Year',
         key: 'year',
         dataIndex: 'year',
         filters: [
            {
               text: '2027',
               value: '2027',
            },
            {
               text: '2025',
               value: '2025',
            },
            {
               text: '2026',
               value: '2026',
            },
         ],
      },
      {
         title: 'Start Month',
         key: 'startMonth',
         dataIndex: 'startMonth',
      },
      {
         title: 'End Month',
         key: 'endMonth',
         dataIndex: 'endMonth',
      },
      {
         title: "Action",
         key: 'x',
         render: () => {
            return (
               <div><Button>Update</Button></div>
            )
         }
      }
   ];

   const onChange: TableProps<TTableData>['onChange'] = (
      pagination,
      filters,
      sorter,
      extra
   ) => {
      if (extra.action === 'filter') {
         const queryParams: TQueryParam[] = [];

         filters.name?.forEach(item =>
            queryParams.push({ name: 'name', value: item })
         );

         filters.year?.forEach(item =>
            queryParams.push({ name: 'year', value: item })
         );
         setParams(queryParams);
      }
   }

   return <Table loading={isFetching} onChange={onChange} columns={columns} dataSource={tableData} />
};

export default AcademicSemester;