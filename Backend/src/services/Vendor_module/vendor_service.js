import Vendor from "../../dao/Vendor_module/Vendor_dao.js";

export default class VendorService{

    static async getAllVendorService(){
        try{
            const vendors=await Vendor.getAllVendors();
            return vendors;
        }catch(err){
            console.error('Error in getAllVendorService: ', err);
            throw err;
        }
    }

    static async getVendorByIdService(vendorId){
        try{
            const vendor=await Vendor.getVendorById(vendorId);
            return vendor;
        }catch(err){
            console.error('Error in getVendorByIdService: ', err);
            throw err;
        }
    };

};