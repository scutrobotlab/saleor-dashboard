import { Skeleton, Text, type TextProps } from "@saleor/macaw-ui-next";

import { type AddressType } from "../../customers/types";

interface AddressFormatterProps {
  address?: AddressType;
  fontSize?: TextProps["size"];
}

const AddressFormatter = ({ address, fontSize }: AddressFormatterProps) => {
  if (!address) {
    return <Skeleton />;
  }

  const isChina = address.country?.code === "CN";
  const nameLine = isChina
    ? `${address.lastName ?? ""}${address.firstName ?? ""}`.trim()
    : `${address.firstName ?? ""} ${address.lastName ?? ""}`.trim();

  return (
    <address
      data-test-id="address"
      style={{
        fontStyle: "inherit",
      }}
    >
      <Text as="p" data-test-id="name" size={fontSize}>
        {nameLine}
      </Text>
      <Text as="p" data-test-id="phone" size={fontSize}>
        {address.phone}
      </Text>
      {address.companyName && (
        <Text as="p" data-test-id="company-name" size={fontSize}>
          {address.companyName}
        </Text>
      )}
      {isChina ? (
        <>
          <Text as="p" data-test-id="country" size={fontSize}>
            {address.country?.country}
          </Text>
          <Text as="p" data-test-id="region-line" size={fontSize}>
            {[address.countryArea, address.city, address.cityArea].filter(Boolean).join(" ")}
          </Text>
          <Text as="p" data-test-id="addressLines" size={fontSize}>
            {address.streetAddress1}
            {address.streetAddress2 ? (
              <>
                <br />
                {address.streetAddress2}
              </>
            ) : null}
          </Text>
        </>
      ) : (
        <>
          <Text as="p" data-test-id="addressLines" size={fontSize}>
            {address.streetAddress1}
            <br />
            {address.streetAddress2}
          </Text>
          <Text as="p" data-test-id="postal-code-and-city" size={fontSize}>
            {" "}
            {address.postalCode} {address.city}
            {address.cityArea ? ", " + address.cityArea : ""}
          </Text>
          <Text as="p" data-test-id="country-area-and-country" size={fontSize}>
            {address.countryArea
              ? address.countryArea + ", " + address.country.country
              : address.country.country}
          </Text>
        </>
      )}
    </address>
  );
};

AddressFormatter.displayName = "AddressFormatter";
export default AddressFormatter;
