FROM eclipse-temurin:17-jdk

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy source code
COPY . /app
WORKDIR /app

# Build JAR
RUN mvn clean package -DskipTests

# Run app
CMD ["java", "-jar", "target/Job-Board-0.0.1-SNAPSHOT.jar"]
