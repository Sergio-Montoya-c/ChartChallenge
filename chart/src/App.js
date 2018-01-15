import React, { Component } from 'react';
import './App.css';
import RC2 from 'react-chartjs2';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Campaign from './Campaign.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      campaignMonths: Campaign.months,
    }
  }

  render() {    
    const {campaignMonths } = this.state;
    const monthsArray = Array.from(Array(campaignMonths).keys());

    let competitorsDataset = Campaign.competitors.reverse().map((competitor, index) => {
      const campaignTotal = ((competitor.medium) + (competitor.strong) + (competitor.resource)) / Campaign.months;
      return {
        label: competitor.url,
        backgroundColor: '#dadada',
        borderColor: '#ccc',
        borderWidth: 2,
        data: monthsArray.map(month => { return Math.ceil(campaignTotal * (month + 1)) })
      }
    });

    const ownCampaignTotal = ((Campaign.suggestMedium) + (Campaign.suggestStrong) + (Campaign.suggestResource)) / Campaign.months;
    const ownDataset = {
      label: Campaign.campaignUrl,
      backgroundColor: '#478FFF',
      borderColor: '#214275',
      borderWidth: 2,
      data: monthsArray.map(month => { return Math.ceil(ownCampaignTotal * (month + 1)) })
    }

    competitorsDataset = [...competitorsDataset, ownDataset];

    var barChartData = {
      labels: monthsArray,
      datasets: competitorsDataset,
    };

    const options = {
      responsive: true,
      scales: {
        yAxes: [{
          stacked: true,
        }]
      },
      legend: {
          position: 'top',
      },
      tooltips: {
        mode: 'index',
        position: 'nearest'
      },
      title: {
          display: true,
          text: 'AMV Competitors Chart'
      }
    }

    return (
      <div className="App" style={{display: 'flex'}}>
        <div style={{padding: '25px', width: '25%'}}>
          <label>Months: {campaignMonths}</label>
          <Slider min={3} max={24} onChange={ value => { this.setState({campaignMonths: value }) } } defaultValue={campaignMonths}/>
        </div>
        <div style={{padding: '25px', width: '75%'}}>
          <RC2 data={barChartData} options={options} type='line' />
        </div>
      </div>
    );
  }
}

export default App;
