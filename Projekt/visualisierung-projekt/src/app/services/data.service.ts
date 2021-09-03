import { EventEmitter, Injectable, Output } from '@angular/core';
import { DSVRowArray } from 'd3';
import { City } from '../models/city';
import { DataClientService } from './data-client.service';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly minPreis=1;
  readonly minLeerstand=0;
  readonly maxPreis = 20;
  readonly maxLeerstand = 6;
  readonly earliestDate = new Date("2010-01-01");
  readonly latestDate = new Date("2021-01-01");

  displayCityGraphs: Boolean = false;

  displayedCities= new Map<string, DSVRowArray>();

  constructor(private _dataClientService: DataClientService) {
    this._dataClientService.selectCityEvent.subscribe((city: string) => {
      this.toggleDisplayCity(city)
    })
   }

  public parseData(City: DSVRowArray): City[]{
    var parsedData: City[] = [];
    City.forEach(d => parsedData.push({Mietpreis: Number(d.Mietpreis), Quartal: this.parseDate(d.Quartal!), Leerstand: Number(d.Leerstand), Immobilienpreis: Number(d.Immobielienpreis)}));  
    parsedData.sort((a: City, b: City) => {
        return a.Quartal.getTime() - b.Quartal.getTime();
    });
    parsedData = parsedData.filter((City) => {return City.Quartal >= new Date("2010-01-01") })
    parsedData.forEach((City) => {
      // console.log("Quartal: "+City.Quartal+" | Mietpreis: "+City.Mietpreis+" | Immobilienpreis: "+City.Immobilienpreis+" | Leerstand: "+City.Leerstand)
      City.Immobilienpreis = City.Immobilienpreis/1000
    })
    return parsedData;
  }


  // Because we cant use Defined
  public filterNullValuesMiete(City: City[]): City[] {
    return City.filter((City)=> {return City.Mietpreis > 0})
  }

  public filterNullValuesLeerstand(City: City[]): City[] {
    return City.filter((City)=> {return City.Leerstand > 0})
  }

  public filterNullValuesImmo(City: City[]): City[] {
    return City.filter((City)=> {return City.Immobilienpreis > 0})
  }

  private parseDate(QuartalDate: string): Date{
    if( QuartalDate !== null){
      var splitDate = QuartalDate.split(" ", 2);
      
      switch(splitDate[0]){
        case "Q1":
          return new Date(splitDate[1]+"-01-01")
          break;
        case "Q2":
          return new Date(splitDate[1]+"-05-01")
          break;
        case "Q3":
          return new Date(splitDate[1]+"-08-01")
          break;
        case "Q4":
          return new Date(splitDate[1]+"-11-01")
          break;
        default:
          return new Date('01 Jan 1970 00:00:00 GMT')
          break;
      }
    }
    else {
      return new Date('01 Jan 1970 00:00:00 GMT')
    }
  }

  private toggleDisplayCity(name: string){
    try {
      if((this.displayedCities.has(name))){
        this.displayedCities.delete(name)
      }
      else {
        this.displayedCities.set(name,this._dataClientService.Cities.get(name)!);
      }
    }
    catch(err){
      console.log(err)
    }
  }

  // TODO: If Time Use this Function for Latest Values
  getLatestValuesOfCities() {

  } 
}
