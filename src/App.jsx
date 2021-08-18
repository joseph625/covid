import React, { useState, useEffect } from 'react';
import './App.css';

import { MenuItem, FormControl, Select, Card } from '@material-ui/core';
import InfoBox from './components/InfoBox.jsx';
//import {Card, CardContent, Typography} from '@material-ui/core';
import Table from './components/Table.jsx';
import { sortData } from './util.js';

function App() {
  const [countries, setCountries] = useState(['USE', 'UK', 'INDIA']);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState('worldwide');
  const [flag, setFlag] = useState('/image/flag.png');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //name country => united kingdom
            value: country.countryInfo.iso2, //abbrivation UK , USA
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    //console.log(countryCode);
    setFlag(
      `https://disease.sh/assets/img/flags/${countryCode.toLowerCase()}.png`
    );

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        setCountryInfo(data);

        //console.log(data)
      });
  };

  return (
    <>
      <div className="app">
        <div className="app__left">
          <h1>Coronavirus COVID-19</h1>
          <div className="app__header">
            <img src={flag} alt="" />
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem className="world" value="worldwide">
                  Worldwide
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem
                    className="world"
                    key={country.id}
                    value={country.value}
                  >
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <img className="img-responsive" src="image/virus.gif" alt="" />

          <div className="app__stats">
            <InfoBox
              className="box-cases"
              title="Corona virus Cases"
              cases={countryInfo.todayCases}
              total={countryInfo.cases}
            />

            <InfoBox
              className="box-recover"
              title="Recovered"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />

            <InfoBox
              className="box-death"
              title="Deaths"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}
            />
          </div>
          <Card className="table-country">
            <h3>Cases Info</h3>
            <Table countries={tableData} />
          </Card>
        </div>

        <div className="app__right">
          <img src="image/virus.gif" alt="" />
        </div>
      </div>

      <footer>
        webdev©Yousif2021
      </footer>
    </>
  );
}

export default App;
