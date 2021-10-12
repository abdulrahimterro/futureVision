const { GMCompany, AMC, Customer } = require('../../../../core/company/meta').CompanyType;

const subject = 'GMDevice';

const infoList = ['-info.firmwareVersion', '-info.serialNumber', '-info.bleMAC', '-info.simICCID'];

module.exports = {
	Admin: (user) => [{ action: 'manage', subject }],

	[GMCompany]: (user) => [
		{
			action: ['read', 'QRCode', 'activate', 'update', 'delete'],
			subject,
			conditions: { owner: user.personalInfo.companyId },
		},
		{
			action: ['list'],
			subject,
			conditions: { owner: user.personalInfo.companyId },
			fields: ['-owner', '-amc', '-hardware', '-manufacturer', '-token', '-structure', '-qrCode', '-template', ...infoList],
		},
	],

	[Customer]: (user) => [
		{
			action: ['list'],
			subject,
			fields: ['-imei', '-amc', '-hardware', '-manufacturer', '-token', '-qrCode', '-template', '-lastUsed', ...infoList],
		},
		{
			action: ['QRCode'],
			subject,
			fields: ['-imei', '-amc', '-hardware', '-manufacturer', '-token', '-qrCode', '-template', '-lastUsed'],
		},
	],

	[AMC]: (user) => [
		{
			action: ['read', 'list'],
			subject,
			conditions: { amc: user.personalInfo.companyId },
			fields: ['-amc', '-hardware', '-manufacturer', '-token', '-structure', '-imei', '-qrCode', '-template', '-lastUsed'],
		},
	],
};
