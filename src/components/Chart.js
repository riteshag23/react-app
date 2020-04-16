import React from "react"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsOrganization from "highcharts/modules/organization";

HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);

const Chart = (props) => {

        
    const options = {
        chart: {
            type: "organization",
            height: 600,
            inverted: true
        },

        title: {
            text: 'NAV Organization Chart'
        },
        tooltip: {
            useHTML: true,            
            opacity: 1,
            style: {                
                color: 'blue',
                fontWeight: 'bold'
            },
            formatter: function() {
                var data = this.point.options;
                var tooltip = '<div><img src="'+ data.image +'" width="80" height="80" /></div><br/>' +
                '<div><h3>'+ data.name+'</h3></div><br/>' +
                '<div>'+ data.department+'</div><br/>' +
                '<div>'+ data.title+'</div><br/>' +
                '<div>'+ data.region+'</div><br/>' +
                '<div>'+ data.office+'</div>' ;
                return tooltip;
                }
            },        
        series: [{
            name: 'NAV',
            keys: ['from', 'to'],
            data: getData(),
            levels: [{
                level: 0,
                color: 'silver',
                dataLabels: {
                    color: 'black'
                },
                height: 25
            }, {
                level: 1,
                color: 'silver',
                dataLabels: {
                    color: 'black'
                },
                height: 25
            }, {
                level: 2,
                color: '#980104'
            }, {
                level: 4,
                color: '#359154'
            }],                  
            nodes: getNodes(),
            colorByPoint: false,
            color: '#007ad0',
            dataLabels: {
                color: 'white'
            },
            borderColor: 'white',
            nodeWidth: 65
        }]
    };

    function getNodes() {
        const { users } = props;
        const nodes = users.sort((a, b) => { return a.reportingManager == b.reportingManager })
            .map(item => {
                return ({
                    id: item.userName,
                    title: item.designation,
                    name: item.userName,
                    image: `data:image/jpeg;base64,${item.photo}`,
                    department:item.department,
                    region:item.region,
                    office:item.office
                });
            });
            console.log("Nodes:"+ JSON.stringify(nodes))
        return nodes;
    }

    function getData() {
        const { users } = props;
        const data = users.sort((a, b) => { return a.reportingManager== b.reportingManager })
            .map(item => {
                if (item.reportingManager != "" && item.reportingManager != null && item.reportingManager!= undefined) {
                    return [item.reportingManager, item.userName];
                }
            });
            console.log("data:"+ JSON.stringify(data))
        return data;
    }


    return (        
    <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>);
}
export default Chart
