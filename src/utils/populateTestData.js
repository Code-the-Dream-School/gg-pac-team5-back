const FactoryBot = require('factory-bot');
const Vendor = require('../models/Vendor.js');
const Client = require('../models/Client.js');
const { fakerEN_US } = require('@faker-js/faker');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    return await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  };
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  };
};

const testVendorEmail = 'aaa@aaa.aaa';
const testClientEmail = 'bbb@bbb.bbb';
const testUserPassword = 'A!1aaaaa';
const vendorModelName = 'vendor';
const clientModelName = 'client';
const defaultCountry = 'US';

const factory = FactoryBot.factory;
const factoryAdapter = new FactoryBot.MongooseAdapter();
factory.setAdapter(factoryAdapter);

factory.define(vendorModelName, Vendor, {
  name: () => fakerEN_US.company.name(),
  email: () => fakerEN_US.internet.email(),
  password: () => testUserPassword,
  street: () => fakerEN_US.location.streetAddress(),
  city: () => fakerEN_US.location.city(),
  state: () => fakerEN_US.location.state({ abbreviated: true }),
  zip: () => fakerEN_US.number.int({ min: 10000, max: 99999 }),
  country: () => defaultCountry,
  phone: () => fakerEN_US.number.int({ min: 1000000000, max: 9999999999 }),
});

factory.define(clientModelName, Client, {
  firstName: () => fakerEN_US.person.firstName(),
  lastName: () => fakerEN_US.person.lastName(),
  email: () => fakerEN_US.internet.email(),
  password: () => testUserPassword,
  street: () => fakerEN_US.location.streetAddress(),
  city: () => fakerEN_US.location.city(),
  state: () => fakerEN_US.location.state({ abbreviated: true }),
  zip: () => fakerEN_US.number.int({ min: 10000, max: 99999 }),
  country: () => defaultCountry,
  phone: () => fakerEN_US.number.int({ min: 1000000000, max: 9999999999 }),
});

const defaultTestVendor = {
  email: testVendorEmail,
  password: testUserPassword,
};

const defaultTestClient = {
  email: testClientEmail,
  password: testUserPassword,
};

const createDefaultVendor = async () => {
  const defaultVendor = await factory.build(vendorModelName);
  return await factory.create(vendorModelName, { createdBy: defaultVendor._id, ...defaultTestVendor });
};

const createDefaultClient = async () => {
  const defaultClient = await factory.build(clientModelName);
  return await factory.create(clientModelName, { createdBy: defaultClient._id, ...defaultTestClient });
};

const createMultipleVendors = async (id) => {
  return await factory.createMany(vendorModelName, 20, { createdBy: id });
};

const createMultipleClients = async (id) => {
  return await factory.createMany(clientModelName, 20, { createdBy: id });
};

const createTestData = async () => {
  try {
    await Vendor.deleteMany({});
    await Client.deleteMany({});
    const { _id: vendorId } = await createDefaultVendor();
    const { _id: clientId } = await createDefaultClient();
    await createMultipleVendors(vendorId);
    await createMultipleClients(clientId);
    console.log('The database is populated');
    console.log(
      `\nDefault vendor email "${testVendorEmail}"
      \nDefault vendor email "${testClientEmail}"
      \nDefault password "${testUserPassword}"\n`
    );
  } catch (error) {
    console.log('Error populating the database');
    console.log(error);
  }
};

module.exports = createTestData;