import {Db} from '../../utils/Db';
const Schema=Db.Schema;

const ConfigurationSchema=new Schema({
    FrecuenciasDePago:Array,
    CustomAmounts:Array
});

export const ConfigurationModel=Db.model('configurations',ConfigurationSchema);