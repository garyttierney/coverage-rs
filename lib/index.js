"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_1 = __importDefault(require("download"));
const decompress_targz_1 = __importDefault(require("decompress-targz"));
const github_1 = require("@actions/github");
const exec = __importStar(require("@actions/exec"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let version;
        const requestedVersion = 'latest';
        if (requestedVersion === 'latest') {
            const gh = new github_1.GitHub('token');
            const latestReleaseResponse = yield gh.repos.getLatestRelease({
                owner: 'xd009642',
                repo: 'tarpaulin'
            });
            version = latestReleaseResponse.data.tag_name;
        }
        else {
            version = requestedVersion;
        }
        const archiveUrl = `https://github.com/xd009642/tarpaulin/releases/download/${version}/cargo-tarpaulin-${version}-travis.tar.gz`;
        yield download_1.default(archiveUrl, '.', {
            followRedirect: true,
            plugins: [decompress_targz_1.default()]
        });
        yield exec.exec('cargo-tarpaulin');
    });
}
main();
