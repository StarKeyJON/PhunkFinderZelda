import { Card } from 'react-bootstrap';
import './NLL.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import rarityData from '../../rarityData.json';
// var Web3 = require('web3')

function RenderNLL(props) {

    // {
    //     "description": "Phunk #3096",
    //     "name": "Phunk #3096",
    //     "attributes": [
    //         {
    //             "trait_type": "Mouth",
    //             "value": "Vape"
    //         },
    //         {
    //             "trait_type": "Hair",
    //             "value": "Pink With Hat"
    //         },
    //         {
    //             "trait_type": "Ears",
    //             "value": "Earring"
    //         },
    //         {
    //             "trait_type": "Eyes",
    //             "value": "Clown Eyes Blue"
    //         },
    //         {
    //             "trait_type": "Sex",
    //             "value": "Female"
    //         }
    //     ],
    //     "image_url": "https://gateway.pinata.cloud/ipfs/QmSv6qnW1zCqiYBHCJKbfBu8YAcJefUYtPsDea3TsG2PHz/notpunk3096.png"
    // }

    const data = props.data;

    function isTraitType(trait, value) {
        for (var i = 1; i < rarityData.length; i++) {
            for (var j = 0; j < rarityData[i].pvs.length; j++) {
                if (Object.values(rarityData[i].pvs[j]).join('').includes(value)) {
                    return (rarityData[i].pvs[j][1])
                }
            }
            for (var k = 0; k < rarityData[i].pvs.length; k++) {
                if (Object.values(rarityData[i].pvs[k]).join('').includes(trait)) {
                    return (rarityData[i].pvs[k])
                }
            }
        }
    };

    function renderTraits() {
        const entries = Object.entries(data.attributes)

        return (
            <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                {entries.map((trait) => {
                    if(typeof trait != 'string'){
                        
                    let t = (trait[1].trait_type)
                    let v = (trait[1].value)
                    let traitIndex = isTraitType(t, v)
                    return (
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                            <h6>{v}</h6>
                            <h6 className='glow'>1 of {traitIndex}</h6>
                        </div>
                        )
                    }  
                })
                }

            </div>
        )
    };
    return (
        <div className='col-12 col-md-6 col-lg-2 traits'>
            <Flippy
                flipOnHover={false} // default false
                flipOnClick={true} // default false
                flipDirection="horizontal"
            >
                <FrontSide>

                    <Card.Img variant="top"
                        src={`https://img.rarible.com/prod/image/upload/prod-itemImages/0xf07468ead8cf26c752c676e43c814fee9c8cf402:${data.returnValues.phunkIndex}/ec5aeae0`}
                        alt={data.name}
                        key={data.id} />
                    <Card.Body>
                        <Card.Title className='test-responsive fs-5'>Phunk #{data.returnValues.phunkIndex}</Card.Title>
                        <div>{data.returnValues.minValue/1000000000000000000}</div>
                    </Card.Body>
                    <Card.Footer>
                        <a className="text-muted glow" href={`https://notlarvalabs.com/market/view/phunk/${data.returnValues.phunkIndex}`}>Get the Phunk! </a>
                    </Card.Footer>

                </FrontSide>

                <BackSide >

                    <Card.Title className='cardTitle'>Phunk #{data.returnValues.phunkIndex}</Card.Title>
                    {/* {rarity()} */}
                    <Card.Text style={{ fontSize: '2bw' }}>
                        <div>Rank # 
                            <p className='glow' style={{ fontSize: '2bw', color: '#FF10F0' }}>
                                {data.rank}
                            </p>
                        </div>
                    </Card.Text>

                    <div>{renderTraits()}</div>

                </BackSide >
            </Flippy>
        </div>
    )
}

export default RenderNLL;
