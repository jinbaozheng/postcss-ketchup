const path = require('path');
const fs = require('fs')
const postcss = require('postcss');
const plugin = require('./');


function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input, {
        from: undefined
    }).then((result) => {
        try {
            fs.writeFile(path.resolve(__dirname, './test/output.scss'),
                result.css,
                {},
                (err) => {
                    if (err) throw err;
                    console.log('解析完成');
                });
        } catch (e) {
            console.log(e);
        }
        // expect(result.css).toEqual(output);
        // expect(result.warnings().length).toBe(0);
    }, (error) => {
        console.log(error.message);
    });
}

test('does something', () => {
    fs.readFile(path.resolve(__dirname, './test/input.scss'),
        'utf8',
        (err, data) => {
            if (err) throw err;
            return run(data, '', {a: 11});
        });
});
