import download from 'download';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

async function main() {
    const version = core.getInput('tarpaulin-version', {
        required: true
    });

    const outputDir = `tarpaulin/${version}`;
    await io.mkdirP(outputDir);

    const archiveName = `cargo-tarpaulin-${version}-travis.tar.gz`;
    const archiveUrl = `https://github.com/xd009642/tarpaulin/releases/download/${version}/${archiveName}`;

    await download(archiveUrl, outputDir, {
        followRedirect: true,
    });

    await exec.exec('tar', ['-C', '/usr/share/rust/.cargo/bin/', '-xvf', `${outputDir}/${archiveName}`]);
}

main();