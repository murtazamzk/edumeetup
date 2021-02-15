import React,{useState,useContext} from 'react';
import { StoreContext } from '../App';
import { Doughnut, Pie } from 'react-chartjs-2';

export default function Reports() {
    const { state, dispatch } = useContext(StoreContext);

    const renderCharts = () => {

        let bgColors_locality = [];
        let age_labels = ['13-18','18-25','25+'];
        let age_count = [];
        let ranges = [[13,18],[18,25],[25,100]];
        let profession_labels = ['Employed','Student'];
        let profession_count = [];
        
        const countByLocality = (users) => {
            var res = users.reduce((obj, v) => {
                obj[v.locality] = (obj[v.locality] || 0) + 1;
                return obj;
            }, {});
            return res;
        }

        const getColor = () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        let countObj = countByLocality(state.users);
        let locality_labels = Object.keys(countObj);
        let locality_count = Object.keys(countObj).map(user => countObj[user]);

        locality_labels.map((label) => bgColors_locality.push(getColor()));

        let localityData = {
            labels: locality_labels,
            datasets: [
                {
                    label: 'Users By Locality',
                    data: locality_count,
                    backgroundColor: bgColors_locality,
                },            
            ],
        }

        ranges.map((range) => {
            let arr = state.users.filter((user) => (user.age >= range[0] && user.age <= range[1]));
            age_count.push(arr.length);
        });

        let ageData = {
            labels: age_labels,
            datasets: [{
                label: 'Users by Age Range',
                data: age_count,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ]
            }]
        }

        profession_labels.map((field) => {
            let arr = state.users.filter((user) => user.profession === field);
            profession_count.push(arr.length);
        });

        let professionData = {
            labels: profession_labels,
            datasets: [{
                label: 'Users by Profession',
                data: profession_count,
                backgroundColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ]
            }]
        }

        return <>
            <div className="chart">
                <h2>Users By Locality</h2>
                <Doughnut options={{legend:{display:false}}} data={localityData} />
            </div>
            <div className="chart">
                <h2>Users By Age Range</h2>
                <Pie options={{legend:{display:true}}} data={ageData} />
            </div>
            <div className="chart">
                <h2>Users By Profession</h2>
                <Pie options={{legend:{display:true}}} data={professionData} />
            </div>
        </>
    }

    return (
        <div className="charts-wrapper">
            {state.users.length ? renderCharts() : null}
        </div>
    )
}
