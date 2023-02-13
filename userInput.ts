import { validateInput } from "./inputValidation";
export async function getUserData() {
    const FirstName: string = await validateInput("Enter your First Name: ", 15, "string");
    const LastName: string = await validateInput("Enter your Last Name: ", 15, "string");
    const Birthday: string = await validateInput("Enter your Birthday: ", 20, "string");
    const Address: string = await validateInput("Enter your Address: ", 10, "string");
    const Phone: string = await validateInput("Enter your Phone Number: ", 10, "string");
    const PhoneNumber: number = parseInt(Phone);
    return {
        FirstName,
        LastName,
        Birthday,
        Address,
        PhoneNumber
    };
}
export async function getProductData() {
    const ProductName: string = await validateInput("Enter your Product Name: ", 15, "string");
    const PN: string = await validateInput("Enter your Product Number: ", 10, "string");
    const ProductNumber: number = parseInt(PN);
    const ProductDescription: string = await validateInput("Enter your Product Description: ", 50, "string");
    const PPC: string = await validateInput("Enter your Price Per Customer: ", 10, "string");
    const PricePerCustomer: number = parseInt(PPC);
    const SP: string = await validateInput("Enter your Supplier Price: ", 10, "string");
    const SupplierPrice: number = parseInt(SP);
    const UIS: string = await validateInput("Enter your Units In Stock: ", 10, "string");
    const UnitsInStock: number = parseInt(UIS);
    return {
        ProductName,
        ProductNumber,
        ProductDescription,
        PricePerCustomer,
        SupplierPrice,
        UnitsInStock
    };
}

export async function getUserProductData() {
    const PN: string = await validateInput("Enter your Purchase Number: ", 10, "string");
    const PurchaseNumber: number = parseInt(PN);
    const PP: string = await validateInput("Enter your Purchase Price: ", 10, "string");
    const PurchasePrice: number = parseInt(PP);
    const DP: string = await validateInput("Enter your Discount Percentage: ", 10, "string");
    const DiscountPercentage: number = parseInt(DP);
    return {
        PurchaseNumber,
        PurchasePrice,
        DiscountPercentage
    };
}