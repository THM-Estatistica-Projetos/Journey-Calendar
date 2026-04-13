from pathlib import Path

import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="journey_calendar",
    version="0.0.1",
    author="THM Estatística",
    author_email="eduardocoutinho30089@gmail.com",
    description="Streamlit component for a calendar using react and pure HTML",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(),

    include_package_data=True,

    package_data={
        "journey_calendar": ["frontend/build/**/*"]
    },

    python_requires=">=3.7",
    install_requires=[
        "streamlit >= 0.63",
    ],
)
