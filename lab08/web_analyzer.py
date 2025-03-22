import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt


url = "https://en.wikipedia.org/wiki/University_of_Calgary"

#--------------------------------------
# 2. Crawl the UoC Wikipedia webpage
#---------------------------------------

try:
    response = requests.get(url)
    response.raise_for_status() # Ensures the request was successful
    soup = BeautifulSoup(response.text, 'html.parser')
    print(f"Successfully fetched content from {url}")
except Exception as e:
    print(f"Error fetching content: {e}")

# print(soup.prettify()) # Shows the html elements returned by soup 



#--------------------------------
# 3. Data Analysis
#--------------------------------

headings = [f"h{i}" for i in range (1, 7)]
num_headings = len(soup.find_all(headings))

num_links = len(soup.find_all("a"))

num_paragraphs = len(soup.find_all("p"))


print("-------------------------")
print("Data Analysis")
print(f"Number of headings (<h1> to <h6>): {num_headings}")
print(f"Number of links (<a> tags): {num_links}")
print(f"Number of paragraphs (<p> tags): {num_paragraphs}")
print("-------------------------")


#-----------------------
# 4. Keyword Analysis
#-----------------------

text = soup.get_text()

keyword = input("\nEnter Keyword to count: ")

keyword_count = text.count(keyword)

print("-------------------------")
print(f"Keyword({keyword}) appears {keyword_count} number of times ")
print("-------------------------")



#-------------------------------
# 5. Word Frequency Analysis
#-------------------------------

words = soup.get_text().split()
words_count = [f"{word}={words.count(word)}" for word in words]
words_count = list(set(words_count)) # Removes duplicates
# print(words_count)
#needs work....





#--------------------------------------
# 6. Finding the Longest Paragraph
#--------------------------------------

paragraphs = soup.find_all("p")
longest_paragraph = ""
max_words = 0
for p in paragraphs:
    paragraph_text = p.get_text().strip()
    word_count = len(paragraph_text.split())
    if word_count >= 5 and word_count > max_words:
        longest_paragraph = paragraph_text
        max_words = word_count


print("-------------------------")
print("Longest Paragraph:")
print(longest_paragraph)
print(f"Number of words: {max_words}")
print("-------------------------")

#---------------------------------
# 7. Visualizing Results
#---------------------------------

labels = ['Headings', 'Links', 'Paragraphs']
values = [num_headings, num_links, num_paragraphs]
plt.bar(labels, values)
plt.title('Put your Group# Here')
plt.ylabel('Count')
plt.show()