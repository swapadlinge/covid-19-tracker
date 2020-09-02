import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select,Card ,CardContent } from "@material-ui/core";
import Map from './Map';
import Table from './Table'
import {sortData} from './util'
import './App.css';
import LineGraph from './LineGraph';
import InfoBox from './InfoBox';



function App() {



  const [countries, setCountries] = useState([]);

  const [country, setCountry] = useState('worldwide');

  const[countryInfo ,setCountryInfo] = useState({ });

  const[tableData, setTableData] = useState([]);

  // https://disease.sh/v3​/covid-19​/countries

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data);
    })

  },[]);


  //USE EFFECT = Runs piece of code based on givern condition

  useEffect(() => {
    //Code here only runs one when app component loads
    // [] contains dependance and it loads whenever [] changes
    //asychronous -> send request and wait for something to return

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ));
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(" YOOO  : "+countryCode);
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) =>{
      setCountry(countryCode);
      setCountryInfo(data);

    });

    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
   
  };
  console.log("Country info : ",countryInfo);


  return (
    <div className="app">

      <div className="app__left">
        <div className="app__header">
      
          <h1>
            COVID-19 TRACKER
          </h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>

              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the contries and display list of options */}
              {
                countries.map(country => (
                  <MenuItem value={country.value}> {country.name} </MenuItem>
                ))
              }

              {/* <MenuItem value="Worldwide"> Worldwide </MenuItem>
            <MenuItem value="Worldwide"> Option 1 </MenuItem>
            <MenuItem value="Worldwide"> Option 2 </MenuItem>
            <MenuItem value="Worldwide"> Option 3 </MenuItem> */}
            </Select>
          </FormControl>
         </div>
        {/* Header */}
        {/* Title + Select input dropdown field */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          {/* Infobox*/}
          {/* Infobox*/}
        </div>

        <Map />

      </div> 
      {/* End of App LEft */}
      
        <Card className="app__right">

           <CardContent>
            <h3>Live Cases by Country</h3>
              <Table countries={tableData}/>
            <h3>Worldwide New Cases</h3>
              <LineGraph/>
             {/* Graph*/}
           </CardContent>
        </Card>
      


    </div>
  );
}

export default App;
