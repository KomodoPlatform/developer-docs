# Note About Rational Number Type

The AtomicDEX API now offers the [num-rational crate](https://crates.io/crates/num-rational) feature. This is used to represent order volumes and prices.

Komodo highly recommends that the developer use the rational number type when calculating an order's price and volume. This avoids rounding and precision errors when calculating numbers, such as `1/3`, as these cannot be represented as a finite decimal.

The AtomicDEX API typically will return both the rational number type as well as the decimal representation, but the decimal representation should be considered only a convenience feature for readability.

The number can be represented in the following two JSON formats:

1. As a fraction object that contains a numerator and a denominator as numeric strings, as follows:

```json
{
  "numer": "10000",
  "denom": "3000"
}
```

2. As a unique format supplied by the `num-rational` crate:

```json
[
  [1, [0, 1]],
  [1, [1]]
]
```

In the above unique format, the first item `[1,[0,1]]` is the `numerator` and the second item `[1,[1]]` is the `denominator`.

The `numerator` and `denominator` are BigInteger numbers represented as a sign and a uint32 array (where numbers are 32-bit parts of big integer in little-endian order).

`[1,[0,1]]` represents `+0000000000000000000000000000000010000000000000000000000000000000` = `4294967296`

`[-1,[1,1]]` represents `-1000000000000000000000000000000010000000000000000000000000000000` = `-4294967297`

