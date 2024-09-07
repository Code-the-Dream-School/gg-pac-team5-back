const FactoryBot = require('factory-bot');
const Vendor = require('../models/Vendor.js');
const Client = require('../models/Client.js');
const { fakerEN_US, faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Service = require('../models/Service.js');
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
const serviceModelName = 'service';
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
  profile: {
    profileImage: () => faker.image.urlLoremFlickr({ category: 'business' }),
    backgroundImage: () => faker.image.url(),
    summary: faker.company.catchPhrase,
    description: () => faker.lorem.sentences(),
  },
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

factory.define(serviceModelName, Service, {
  name: () => faker.commerce.productName(),
  image: () => faker.image.urlLoremFlickr({ category: 'food' }),
  description: () => faker.commerce.productDescription(),
  price: faker.commerce.price
})

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
  return await factory.create(vendorModelName, { createdBy: defaultVendor._id, updatedBy: defaultVendor._id, ...defaultTestVendor });
};

const createDefaultClient = async () => {
  const defaultClient = await factory.build(clientModelName);
  return await factory.create(clientModelName, { createdBy: defaultClient._id, updatedBy: defaultClient._id, ...defaultTestClient });
};

const createMultipleVendors = async (id) => {
  return await factory.createMany(vendorModelName, 20, { createdBy: id, updatedBy: id });
};

const createMultipleClients = async (id) => {
  return await factory.createMany(clientModelName, 20, { createdBy: id, updatedBy: id });
};

const createMultipleServices = async () => {
  const vendors = await Vendor.find({});
  vendors.map((vendor) => vendor._id).forEach(async (id) => await factory.createMany(serviceModelName, 3, { createdBy: id, updateBy: id }))
}

const createTestData = async () => {
  try {
    await Vendor.deleteMany({});
    await Client.deleteMany({});
    await Service.deleteMany({});
    const { _id: vendorId } = await createDefaultVendor();
    const { _id: clientId } = await createDefaultClient();
    await createMultipleVendors(vendorId);
    await createMultipleClients(clientId);
    await createMultipleServices();
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
