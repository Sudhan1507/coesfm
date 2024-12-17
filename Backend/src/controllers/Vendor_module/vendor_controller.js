import VendorService from "../../services/Vendor_module/vendor_service.js";

export default class VendorController{
    static async getAllVendorsController(req, res) {
        try {
            const vendors = await VendorService.getAllVendorService();
            res.status(200).json({status:'success',data: vendors});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async getVendorByIdController(req, res) {
        try {
            const {vendor_id} = req.params;
            if (!vendor_id) {
                return res.status(400).json({ error: 'Vendor ID is required' });
            }
            const vendor = await VendorService.getVendorByIdService(vendor_id);
            if (!vendor) {
                return res.status(404).json({ error: 'Vendor not found' });
            }
            res.status(200).json({status:'success',data: vendor});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    };

};