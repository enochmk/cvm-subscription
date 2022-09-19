import config from 'config';
import axios from 'axios';
import xml2js from 'xml2js';
import rtracer from 'cls-rtracer';
import { IContext } from '../interfaces/ILogger';
import appMessages from '../messages/app.messages';
import HttpError from '../utils/errors/HttpError';
import logger from '../utils/loggers/logger';

const URL: string = config.get('api.cbs.url');
const USERNAME: string = config.get('api.cbs.username');
const PASSWORD: string = config.get('api.cbs.password');
const SUCCESS_CODE = '405000000';
const INSUFFICIENT_CODE = '405914012';

const subscribeProductApi = async (msisdn: string, productID: number) => {
	const context: IContext = {
		label: 'SubscribeAppendantProductApi',
		request: { msisdn, productID },
	};

	const soapHeader = {
		headers: {
			'Content-Type': 'text/xml',
			SoapAction: 'SubscribeAppendantProduct',
		},
	};

	const requestID = Date.now().toString();
	const soapRequest = `
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bus="http://www.huawei.com/bme/cbsinterface/cbs/businessmgrmsg" xmlns:com="http://www.huawei.com/bme/cbsinterface/common" xmlns:bus1="http://www.huawei.com/bme/cbsinterface/cbs/businessmgr">
				<soapenv:Header/>
				<soapenv:Body>
					<bus:SubscribeAppendantProductRequestMsg>
							<RequestHeader>
								<com:CommandId>SubscribeAppendantProduct</com:CommandId>
								<com:Version>1</com:Version>
								<com:TransactionId>TransID_203948</com:TransactionId>
								<com:SequenceId>1</com:SequenceId>
								<com:RequestType>Event</com:RequestType>
								<com:SessionEntity>
										<com:Name>${USERNAME}</com:Name>
										<com:Password>${PASSWORD}</com:Password> 
										<com:RemoteAddress>10.1.1.184</com:RemoteAddress>
								</com:SessionEntity>
								<com:SerialNo>${requestID}</com:SerialNo>
								<com:Remark>cvm_subscription</com:Remark>
							</RequestHeader>
							<SubscribeAppendantProductRequest>
								<bus1:SubscriberNo>${msisdn}</bus1:SubscriberNo>
								<bus1:Product>
										<bus1:Id>${productID}</bus1:Id>
										<bus1:ValidMode>4050000</bus1:ValidMode>
								</bus1:Product>
							</SubscribeAppendantProductRequest>
					</bus:SubscribeAppendantProductRequestMsg>
				</soapenv:Body>
		</soapenv:Envelope>
	`;

	const soapResponse = await axios.post(URL, soapRequest, soapHeader);
	const jsonResponse = await xml2js.parseStringPromise(soapResponse.data);
	const responseData = jsonResponse['soapenv:Envelope']['soapenv:Body'][0];
	const resultCode =
		responseData.SubscribeAppendantProductResultMsg[0].ResultHeader[0]
			.ResultCode[0]._;
	const resultDesc =
		responseData.SubscribeAppendantProductResultMsg[0].ResultHeader[0]
			.ResultDesc[0]._;

	context.response = {
		responseData: jsonResponse,
	};

	// ! Not successful
	if (resultCode !== SUCCESS_CODE) {
		if (resultCode === INSUFFICIENT_CODE) {
			throw new HttpError(appMessages.INSUFFICIENT_BALANCE_MSG, 400, context);
		}
		throw new HttpError(resultDesc, 400, context);
	}

	logger.info('success', context);
};

export default subscribeProductApi;
