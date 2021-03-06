const { makeBlock } = require( "../TestUtils" );
const { BlockTypes } = require( "../../build/core/BlockTypes" );
const SampleBlock = BlockTypes.get( "Sample" );

function verifySamples( startValue, endValue, numSamples, expected ) {
	let block = makeBlock( SampleBlock, [ startValue, endValue, numSamples ] );
	let samples = block.getOutputValue( 0 );
	expect( samples ).toEqual( expected );
}

describe( "SampleBlock", () => {
	it( "is defined as a block type", () => {
		expect( SampleBlock ).toBeDefined();
	} );
	
	it( "defines default input values", () => {
		expect( SampleBlock.getDefaultInputValues( {} ) ).toEqual( [ 1, 10, 10 ] );
	} );

	it( "returns evenly distributed samples of numbers", () => { 
		verifySamples( 1, 10, 10, [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] );		
	} );

	it( "returns evenly distributed samples of numbers when size is odd number", () => { 
		verifySamples( 1, 10, 3, [ 1, 5.5, 10 ] );		
	} );

	it( "returns evenly distributed samples of numbers when size is even number", () => { 
		verifySamples( 1, 10, 6, [ 1, 2.8, 4.6, 6.4, 8.2, 10 ] );	
	} );

	it( "returns array containing start value if sample size is 1", () => {
		verifySamples( 1, 10, 1, [ 1 ] );
	} );

	it( "returns empty array if sample size less than 1", () => {
		verifySamples( 1, 10, 0, [] );
	} );

	it( "returns numbers in reverse order when end value is less than start", () => { 
		verifySamples( 10, 1, 10, [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ] );
	} );

	it( "returns numbers in reverse order when end value is less than start and size is odd number", () => { 
		verifySamples( 10, 1, 3, [ 10, 5.5, 1 ] );
	} );

	it( "returns numbers in reverse order when end value is less than start and size is even number", () => { 
		verifySamples( 10, 1, 6, [ 10, 8.2, 6.4, 4.6, 2.8, 1 ] );
	} );

	it( "returns number repeated the sample size if the start and end values are the same", () => { 
		verifySamples( 1, 1, 5, [ 1, 1, 1, 1, 1 ] );
	} );

	it( "returns evenly distributed samples of numbers when size is 5", () => { 
		verifySamples( 1, 3, 5, [ 1, 1.5, 2, 2.5, 3 ] );
	} );

	it( "returns evenly distributed samples of numbers in reverse when size is 5", () => { 
		verifySamples( 3, 1, 5, [ 3, 2.5, 2, 1.5, 1 ] );
	} );
} );