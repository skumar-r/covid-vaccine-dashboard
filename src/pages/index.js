import React, { useState, useEffect } from 'react';
import { StaticImage } from "gatsby-plugin-image"
import axios from 'axios';
import Layout from "../components/layout"
import Seo from "../components/seo"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import DatePicker from 'react-date-picker';

const columns = [{
  dataField: 'center_id',
  text: 'Centre ID'
}, {
  dataField: 'name',
  text: 'Address',
  formatter: (cell, row, rowIndex, extraData) => (
    <div>
      <span>Name: {row.name}</span>
      <br />
      <span>Address: {row.address}</span>
      <br />
      <span>Block Name: {row.block_name}</span>
      <br />
      <span>Pin Code: {row.pincode}</span>
    </div>
  )
},
{
  dataField: 'available_capacity',
  text: 'Available Capacity'
},
{
  dataField: 'vaccine',
  text: 'Vaccine'
},
{
  dataField: 'min_age_limit',
  text: 'Age Limit'
},
{
  dataField: 'slots',
  text: 'Slots Available',
  formatter: (cell, row, rowIndex, extraData) => (
    <div>{row.slots.join('\n')}</div>    
  )
},
{
  dataField: 'fee_type',
  text: 'Free/Paid'
}
];

const IndexPage = () => {
  const [value, setValue] = useState(new Date());
  const [data, setData] = useState({ sessions: [] });
  
  useEffect(() => {
    const fetchData = async () => {
      let [month, date, year]    = new Date(value).toLocaleDateString("en-US").split("/");
      const result = await axios(
        'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=544&date='+(date+'-'+month+'-'+year)
      );
      setData(result.data);
    };
 
    fetchData();
  }, [value]);


  return (
    <Layout>
      <Seo title="Dashboard" />         
      <StaticImage
        src="../images/stop-covid19-min.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Covid-19 India"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>You can check the vaccine availability in Kanyakumari district.</p>
      <p>Select a Date: <DatePicker
        onChange={setValue}
        value={value}
      />
      </p>
      <p>
        <BootstrapTable keyField='centre_id' data={data.sessions} columns={columns} />
      </p>
    </Layout>)

}

export default IndexPage
