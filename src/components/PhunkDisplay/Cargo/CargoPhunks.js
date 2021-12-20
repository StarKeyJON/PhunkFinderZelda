import React, { useState, useEffect } from 'react';
import { Cargo } from '@cargo-eth/js';
import RenderCargoData from './RenderCargo';
import Pagination from '../../Pagination/Pagination';
import './cargo.css';
import logo from '../../flip.gif';
import phunkRank from '../../../phunkRanks';

function CargoPhunks() {

    // Fetching Phunk data from cargo api

    let [cargoData, setCargoData] = useState([]);
    let [searchQ, setSearchQ] = useState('');

    //sort rank
    let [rankQ, setRankQ] = useState('');

    //sort price
    let [priceQ, setPriceQ] = useState('');

    //search filter
    let [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {

        const cargo = new Cargo({ network: 'production' });

        const options = {
            sort: "new",
            limit: 2500,
            collectionAddress: "0xf07468eAd8cf26c752C676E43C814FEe9c8CF402",
            collectionId: "60cfe668b0efb10008c3ce10"
        };
        cargo.api.getResaleItems(options).then(response => {
            response.data.results.forEach((cargoData) => {
                if (cargoData.ids[0].length === 3) {
                    cargoData.ids[0] = ('0' + cargoData.ids[0])

                } else if (cargoData.ids[0].length === 2) {

                    cargoData.ids[0] = ('00'+cargoData.ids[0])

                } else if (cargoData.ids[0].length === 1) {

                    cargoData.ids[0] = ('000'+cargoData.ids[0])
                }
                for(var i = 1; i < phunkRank.length; i++) {

                    if (phunkRank[i][" id"].slice(0,4)===cargoData.ids[0]) {
                        cargoData.rank = phunkRank[i]['ranking'];
                    }
                }
            });
            response.data.results.sort(function (x, y) {
                return x.price - y.price;
            });
            setCargoData(response.data.results)

        }).catch((e) => console.log(e));

    }, []);

    function handleSearch (event){

        setSearchQ(event.target.value.toLowerCase());

        if (searchQ.length > 0) {
            let filtered = cargoData.filter((data) => {
                if (data.metadata.attributes) {
                    return data.metadata.attributes.some((value) => {
                        return Object.values(value).join('').toLowerCase().includes(searchQ);
                    })
                } else {
                    return setFilteredResults()
                }
            })
            return setFilteredResults(filtered);
        } else {
            return setFilteredResults([]);
        }
    }

    function handleRankSort (event){
        if (event.target.value === 'high_low'){
            // console.log(cargoData);
            cargoData.sort(function (x, y) {
                return y.rank - x.rank;
            });
            setRankQ(event.target.value);
        }else{
            cargoData.sort(function (x, y) {
                    return x.rank - y.rank;
                });
            setRankQ(event.target.value);
        }
    }

    function handleFilterRankSort (event){
        if (event.target.value === 'high_low'){
            // console.log(cargoData);
            filteredResults.sort(function (x, y) {
                return y.rank - x.rank;
            });
            setRankQ(event.target.value);
        }else{
            filteredResults.sort(function (x, y) {
                    return x.rank - y.rank;
                });
            setRankQ(event.target.value);
        }
    }

    function handlePriceSort (event){
        if (event.target.value === 'low-to-high'){
            cargoData.sort(function (x, y) {
                return x.price - y.price;
            });
            
            setPriceQ(event.target.value)
        }else{
            cargoData.sort(function (x, y) {
                return y.price - x.price;
            });
            setPriceQ(event.target.value)
        }
    }

    function handleFilterPriceSort (event){
        if (event.target.value === 'low-to-high'){
            filteredResults.sort(function (x, y) {
                return x.price - y.price;
            });
            
            setPriceQ(event.target.value)
        }else{
            filteredResults.sort(function (x, y) {
                return y.price - x.price;
            });
            setPriceQ(event.target.value)
        }
    }

    function checkDataLength(filteredResults){
        if ( (filteredResults.length / 6 ) > 5) {
            return(5);
        } else {
            return( Math.ceil(filteredResults.length / 6) );
        }
    }

    return (

        <div >

            {filteredResults.length > 0 ? (
                <>
                    <h1 style={{ margin: '0 auto', marginTop: '20px', marginBottom: '5px' }}>Cargo Phunks</h1>

                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                            <label>Search:</label>
                            <input type="search"  onChange={(event) => handleSearch(event)} />
                            <text >{filteredResults.length} Phunks Available</text>
                        </div>
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px', overflow: 'hidden' }}>
                            <div className="row" style={{justifyContent: 'center'}}>
                                <div className="col-md-3 col-5">
                                    <label>Rank:</label>
                                    <select className="form-select" aria-label="Rank" value={rankQ} onChange={handleFilterRankSort}>
                                        <option value="high_low">Least Rare Phirst</option>
                                        <option value="low_high">Most Rare Phirst</option>
                                    </select>
                                </div>
                                <div className="col-md-3 col-5">
                                    <label>Price:</label>
                                    <select className="form-select" aria-label="Price" value={priceQ} onChange={handleFilterPriceSort}>
                                        <option value="high-to-low">Highest Price Phirst</option>
                                        <option value="low-to-high">Lowest Price Phirst</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    <Pagination
                        data={filteredResults}
                        RenderComponent={RenderCargoData}
                        pageLimit={checkDataLength(filteredResults)}
                        dataLimit={6}
                    />
                </>

            ) : cargoData.length > 0 ? (
                <>
                    <h1 style={{ margin: '0 auto', marginTop: '20px', marginBottom: '5px' }}>Cargo Phunks</h1>
                    <div className="App">
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                            <label>Search:</label>
                            <input type="search" onChange={(event) => handleSearch(event)} />
                            <text>{cargoData.length} Phunks Available</text>
                        </div>
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px', overflow: 'hidden' }}>
                            <div className="row" style={{justifyContent: 'center'}}>
                                <div className="col-md-3 col-5">
                                    <label>Rank:</label>
                                    <select className="form-select" aria-label="Rank" value={rankQ} onChange={handleRankSort}>
                                        <option value="high_low">Least Rare Phirst</option>
                                        <option value="low_high">Most Rare Phirst</option>
                                    </select>
                                </div>
                                <div className="col-md-3 col-5">
                                    <label>Price:</label>
                                    <select className="form-select" aria-label="Price" value={priceQ} onChange={handlePriceSort}>
                                        <option value="high-to-low">Highest Price Phirst</option>
                                        <option value="low-to-high">Lowest Price Phirst</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination
                        data={cargoData}
                        RenderComponent={RenderCargoData}
                        pageLimit={5}
                        dataLimit={6}
                    />

                </>
            ) : (
                <div>
                    <h4>Loading Cargo Phunks...</h4>
                    <img className='inver' src={logo} alt="Loading Cargo Phunks..." />
                </div>
            )}
        </div>

    )
};

export default CargoPhunks;
