const React = window.React = require('react');
import OfferTables from './OfferTables.jsx';
import PairPicker from './PairPicker.jsx';
import OfferMakers from './OfferMakers.jsx';
import ManageOffers from './ManageOffers.jsx';
import PriceChart from './PriceChart.jsx';
import Generic from './Generic.jsx';
import Stellarify from '../lib/Stellarify';
import TermsOfUse from './TermsOfUse.jsx';
import Ellipsis from './Ellipsis.jsx';
import directory from '../../directory';
import moment from "moment";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from './Chart';
import { getData } from "./utils";
const Json2csvParser = require('json2csv').Parser;
const writeFileP = require("write-file-p");

writeFileP(`./file.txt`, "Hello World", (err, data) => {
    console.log(err || data);
});


export default class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.unsub = this.props.d.orderbook.event.sub(() => {this.forceUpdate()});
    this.unsubSession = this.props.d.session.event.sub(() => {this.forceUpdate()});

  }

  componentDidMount(){


}

  componentWillUnmount() {
    this.unsub();
    this.unsubSession();
  }

  render() {




    if (!this.props.d.orderbook.data.ready) {

      return <Generic title="Loading orderbook">Loading orderbook data from Horizon<Ellipsis /></Generic>
    }



  var candleData= [];
    if (this.props.d.orderbook.data.trades !== undefined){
    let date ;
    let absoluteChange;
    let dividend : "";
    let percentChange;
    let split: "";
    let open ;
    let close;
    let high = 0;
    let low =5000;
    let dateParsed ;
    let tempDate ;
    let volume ;
    let dateKey = 0;
     this.props.d.orderbook.data.trades.map((elem,key) => {

      date = elem[0] / 1000 ;
      dateParsed = moment.unix(date).toISOString();

      if (dateParsed == tempDate || !tempDate){

      tempDate = dateParsed;
      open = elem[1];
       if (!close){
          close = elem[1];
       }
       if (elem[1] > high){
         high = elem[1];
       }
       if (elem[1] < low)
       {
         low = elem[1] ;
       }
    }
    else{
      candleData[dateKey] = {
        date : dateParsed ,
        open : open ,
        high : high ,
        close : close ,
        low : low,
        volume : 1,
        absoluteChange:"",
        dividend : "",
        percentChange: "",
        split: ""

      }
      dateKey++;
      high = 0 ;
      low = 5000;
      tempDate = null;
      open = 0;
      close = 0;
      volume = 1;
    }
     })

     const fields = [  "date"  , "open"  , "high"  ,  "close" , "low" , "volume" ,  "absoluteChange"  ,  "dividend" , "percentChange"  , "split" ];
     const opts = { fields }

     try {
       const parser = new Json2csvParser(opts);
       const csv = parser.parse(candleData);
       // console.log(csv);

       // Write a text file



     } catch (err) {
       console.error(err);
     }

  }

      if ( candleData.length == 0){
        return <div> no candle looser!</div>
      }



    let thinOrderbookWarning;
    let data = this.props.d.orderbook.data;
    let ticker = this.props.d.ticker;
    let warningWarning;






    if (ticker.ready) {
      let baseSlug = Stellarify.assetToSlug(data.baseBuying);
      let counterSlug = Stellarify.assetToSlug(data.counterSelling);

      let aggregateDepth = 0;

      if (baseSlug !== 'XLM-native') {
        for (let i in ticker.data.assets) {
          if (ticker.data.assets[i].slug === baseSlug) {
            aggregateDepth += ticker.data.assets[i].depth10_USD;
          }
        }
      }
      if (counterSlug !== 'XLM-native') {
        for (let i in ticker.data.assets) {
          if (ticker.data.assets[i].slug === counterSlug) {
            aggregateDepth += ticker.data.assets[i].depth10_USD;
          }
        }
      }

      if (aggregateDepth < 100) {
        thinOrderbookWarning = <div className="Exchange__warning">
          <div className="s-alert s-alert--warning">
            The orderbook for this pair is thin. To get a better price, create an offer without taking an existing one.
          </div>
        </div>
      }


    }

    let directoryAsset = directory.getAssetByAccountId(data.baseBuying.code, data.baseBuying.issuer);
    if (directoryAsset !== null && directoryAsset.warning !== undefined) {
      warningWarning = <div className="Exchange__warning">
        <div className="s-alert s-alert--warning">
          {directoryAsset.warning}
        </div>
      </div>
    }

    let offermakers;
    if (directoryAsset !== null && directoryAsset.disabled !== undefined) {
      offermakers = <div className="Exchange__orderbookDisabled">
        Offer making has been disabled for this pair. You may still cancel your existing offers below.
      </div>
    } else {
      offermakers = <OfferMakers d={this.props.d}></OfferMakers>
    }



    return <div>
      <div className="so-back islandBack islandBack--t">
    <div className="island Exchange__orderbook">
        <div className="island__header">

    <TypeChooser>
      {type => <Chart type={type} data={candleData} />}
    </TypeChooser>


    </div>
    </div>
    </div>

      <div className="so-back islandBack islandBack--t">
        <PairPicker d={this.props.d}></PairPicker>
      </div>
      <PriceChart d={this.props.d}></PriceChart>
      <div className="so-back islandBack">
        <div className="island Exchange__orderbook">
          <div className="island__header">
            Orderbook
          </div>
          {thinOrderbookWarning}
          {warningWarning}
          <div>
            {offermakers}
            <div className="island__separator"></div>
            <OfferTables d={this.props.d}></OfferTables>
          </div>
        </div>
      </div>
      <div className="so-back islandBack">
        <div className="island">
          <div className="island__header">
            Manage offers
          </div>
          <ManageOffers d={this.props.d}></ManageOffers>
        </div>
      </div>
    </div>
  }
}
