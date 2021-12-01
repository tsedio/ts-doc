import Chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import Sinon from "sinon";
import SinonChai from "sinon-chai";

Chai.should();
Chai.use(SinonChai);
Chai.use(ChaiAsPromised);

const {expect, assert} = Chai;

export {expect, assert, Sinon, Chai, SinonChai};
