const path = require('path');
const fs = require('fs')
const postcss = require('postcss');
const plugin = require('./');


function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input, {
        from: undefined
    }).then((result) => {
        // expect(result.css).toEqual(output);
        // expect(result.warnings().length).toBe(0);
        try {
            fs.writeFile(path.resolve(__dirname, './test/output.css'),
                result.css,
                {},
                (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
        } catch (e) {
            console.log(e);
        }
    }, (error) => {
        console.log(error.message);
    });
}

/* Write tests here

it('does something', () => {
    return run('a{ }', 'a{ }', { });
});

*/

test('does something', () => {
    fs.readFile(path.resolve(__dirname, './test/input.css'),
        'utf8',
        (err, data) => {
            if (err) throw err;
            return run(data, '');
        });
});
