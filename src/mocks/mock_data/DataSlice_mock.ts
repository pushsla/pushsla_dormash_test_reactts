import {IDataTableAuthRow} from "@data/DataSlice/DataSlice";
import {hashRowPassword} from "@data/DataSlice/DataSlice.impl";

export const dataSlice_mock: Array<IDataTableAuthRow> = [
    {email:"foxxy@gmail.xyz", password:"1wqfegw", gender:"M", timestamp:Date.now().toString(), hashed:hashRowPassword("1wqfegw")},
    {email:"ManiacOne@fabric.mc", password:"1234rf", gender:"M", timestamp:Date.now().toString(), hashed:hashRowPassword("1234rf")},
    {email:"myLittle@pony.mov", password:"rq4t3g    ", gender:"M", timestamp:Date.now().toString(), hashed:hashRowPassword("rq4t3g    ")},
    {email:"fluffy@furry.yiff", password:"f3454hg", gender:"F", timestamp:Date.now().toString(), hashed:hashRowPassword("f3454hg")},
    {email:"Mainchart@test.com", password:"23rewfa", gender:"F", timestamp:Date.now().toString(), hashed:hashRowPassword("23rewfa")},
    {email:"habredlesson@manjaro.org", password:"2efWETG", gender:"F", timestamp:Date.now().toString(), hashed:hashRowPassword("2efWETG")},
    {email:"finite@incantatem.spell", password:"23RGHTG", gender:"F", timestamp:Date.now().toString(), hashed:hashRowPassword("23RGHTG")},
    {email:"majesty@four.int", password:"EWFERGTH", gender:"?", timestamp:Date.now().toString(), hashed:hashRowPassword("EWFERGTH")},
    {email:"hard@project.react", password:"234333R", gender:"?", timestamp:Date.now().toString(), hashed:hashRowPassword("234333R")},
    {email:"milenial@mail.for", password:"324ggdsgfg", gender:"?", timestamp:Date.now().toString(), hashed:hashRowPassword("324ggdsgfg")}
];