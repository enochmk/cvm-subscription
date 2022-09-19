import HttpError from '../utils/errors/HttpError';

function validateMsisdn(msisdn: string) {
	// ! Invalid MSISDN dataType
	if (!parseInt(msisdn)) {
		throw new HttpError(`Not a valid MSISDN: ${msisdn}`, 400);
	}

	// ! invalid length
	if (!msisdn.length) {
		throw new HttpError(`Invalid MSISDN length: ${msisdn.length}`, 400);
	}
}

export default validateMsisdn;
