import { logError } from "../../logging.js";
// Generates email content based on the books data
async function generateEmailContent(books) {
  try {
    let content = `
    <div class="email-template">
      <p>These recommendations have been selected according to your preferences:</p>
  `;

    books.forEach((book) => {
      const authors = book.authors ? book.authors.join(", ") : "Unknown";
      const rating =
        book.reviews && book.reviews[0] ? book.reviews[0].rating : "No rating";
      const description = book.description || "No description available";
      const image = book.image
        ? `<img src="${book.image}" alt="${book.title}" width="200" style="display: block;" />`
        : "<strong>Cover:</strong> No cover";

      content += `
      <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 10px;">
        <h3><strong>${book.title}</strong></h3>
        <p>${image}</p>
        <p><strong>Author:</strong> ${authors}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Rating:</strong> ${rating}</p>
      </div>
    `;
    });

    content += `
    </div>
  `;
    return content;
  } catch (error) {
    logError("Error generating email content", error);
    throw error;
  }
}

export default generateEmailContent;
