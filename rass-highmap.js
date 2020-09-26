//Map Distribution

            /**
             * Event handler for clicking points. Use jQuery UI to pop up
             * a pie chart showing the details for each state.
             */

            function pointClick() {

                $('#pop').dialog({
                    title: this.name + ' [ARV Category]',
                    width: 'auto',
                    height: 'auto'
                });

                window.chart = new Highcharts.Chart({
                    chart: {
                        renderTo: '#pop',
                        type: 'pie',
                        width: 370,
                        height: 240
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    series: [{
                        name: 'Categories',
                        data: [{
                            name: 'Adults',
                            color: '#0200D0',
                            y: 70
                        }, {
                            name: 'Paediatrics',
                            color: '#C40401',
                            y: 30
                        }],
                        dataLabels: {
                            format: '<b>{point.name}</b> {point.percentage:.1f}%'
                        }
                    }]
                });

            }

            //Function drawMap
            function drawMap(data) {
                $.getJSON('assets/files/organisationUnits.geojson', function (geojson) {
                    // Instanciate the map
                    Highcharts.mapChart('dmap', {

                        chart: {
                            borderWidth: 1,
                            height: 400,
                            borderColor: 'grey'
                        },

                        title: {
                            text: 'Stockout Distribution Rates (%)' + '<br />' + cat + ' (' + $('#w').html() + ')'
                        }
                        /*
                        ,
                        subtitle: {
                            text: 'Click on District for more details'
                        }
                        */
                        ,

                        legend: {
                            enabled: true
                        },
                        credits: {
                            enabled: false,
                            text: 'Mets.or.ug',
                            href: 'http://www.mets.or.ug'
                        },

                        colorAxis: {

                            dataClasses: [{
                                from: 0,
                                to: 25,
                                color: '#ADFF2F',
                                name: '<=25'
                            }, {
                                from: 26,
                                to: 50,
                                color: '#FFFF00',
                                name: '<=50'
                            },
                                {
                                    from: 51,
                                    to: 75,
                                    color: '#FF0000',
                                    name: '<=75'
                                },
                                {
                                    from: 76,
                                    to: 100,
                                    color: '#bf0000',
                                    name: '<=100'
                                }
                            ]
                        },
                        exporting: {
                            filename: 'RASS_stockout_rate_distribution_per_district_' + cat + '_' + $('#w').html(),
                            buttons: {
                                contextButton: {
                                    menuItems: [
                                        "printChart",
                                        "separator",
                                        "downloadPNG",
                                        "downloadJPEG",
                                        "downloadPDF",
                                        //"downloadSVG",
                                        "separator",
                                        "downloadXLS",
                                        "downloadCSV"
                                        //"viewData",
                                        //"openInCloud"
                                        /*
                                        {
                                            textKey: 'downloadJPEG',
                                            onclick: function () {
                                                alert('Hey');
                                                this.exportChart({
                                                    //type: 'image/jpeg'
                                                    //type: 'application/pdf'
                                                    //this.downloadCSV();
                                                    //this.downloadXLS();
                                                    //this.print();
                                                    //this.exportChart();//defaults to png
                                                });
                                            }
                                        }
                                        */
                                    ]
                                }
                            }
                        },
                        series: [{
                            name: 'Stockouts',
                            mapData: geojson,
                            joinBy: 'name',
                            keys: ['name', 'value'],
                            data: data,
                            color: '#FF0000',
                            dataLabels: {
                                enabled: false,
                                color: '#FFFFFF',
                                formatter: function () {
                                    if (this.point.value) {
                                        return this.point.name;
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '',
                                pointFormat: '{point.name}' + '<br />{point.value}%'
                            },

                            states: {
                                hover: {
                                    color: '#DCDCDC',
                                    borderWidth:1,
                                    borderColor:'#000000'
                                }
                            }
                            /*
                            ,
                            point: {
                                events: {
                                    click: pointClick
                                }
                            }
                        */
                        }
                        ]

                    });//end
                });
            }