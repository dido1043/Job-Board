# Use a base image with JDK 17
FROM eclipse-temurin:17-jdk

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set working directory
WORKDIR /app

# Copy project files into container
COPY . .

# Build the Spring Boot app (skip tests to speed up build)
RUN mvn clean package -DskipTests

# Run the JAR
CMD ["java", "-jar", "target/Job-Board-0.0.1-SNAPSHOT.jar"]
