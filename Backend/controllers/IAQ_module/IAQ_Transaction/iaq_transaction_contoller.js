import IAQTransactionService from "../../../services/IAQ_module/IAQ_Transaction/iaq_transaction_service.js";

export default class IAQTransactionController {
    static async addIaqTransactionController(req, res) {
        try {
            const transactionDataArray = req.body; // Expecting an array of transaction data
            await IAQTransactionService.addIaqTransactionService(transactionDataArray);
            return res.status(200).json({ status: 'success' });
        } catch (err) {
            return res.status(500).json({ status: 'failed', message: err.message });
        }
    }

    static async getIaqTransactionsController(req, res) {
        try {
            const response = await IAQTransactionService.getIaqTransactionsService();
            return res.status(200).json({ status: 'success', data: response });
        } catch (err) {
            return res.status(500).json({ status: 'failed', message: err.message });
        }
    }
}
