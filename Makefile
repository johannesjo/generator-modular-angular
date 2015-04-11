TESTS = test/**/*.spec.js
INSTANCE_TESTS_DIR = .test-instance
INSTANCE_TESTS = test-app/**/*.spec.js
REPORTER = spec
COVERAGE_REPORT = ./coverage/lcov.info
COVERALLS = ./node_modules/coveralls/bin/coveralls.js

test: test-mocha

test-mocha:
	@NODE_ENV=test mocha \
	    --timeout 200 \
		--reporter $(REPORTER) \
		$(TESTS)

test-full:
	istanbul cover _mocha -- -R spec $(TESTS)
	rm -rf *
	npm install -g yo bower generator-moda
	yes | yo moda --skip-install
	npm cache clean
	npm install
	bower install
	gulp injectAll
	gulp testSingle
	gulp build

istanbul:
	istanbul cover _mocha -- -R spec $(TESTS)

coveralls:
	cat $(COVERAGE_REPORT) | $(COVERALLS)

cov-html: test-cov html-cov-report

html-cov-report:
	istanbul report html

npm:
	npm publish ./

check:
	travis-lint .travis.yml

clean:
	rm -rf ./coverage

test-app:
	istanbul cover _mocha -- -R spec $(INSTANCE_TESTS)

app-instance:
	rm -rf $(INSTANCE_TESTS_DIR)/
	mkdir $(INSTANCE_TESTS_DIR)
	cd $(INSTANCE_TESTS_DIR) && echo "CDing into $(INSTANCE_TESTS_DIR)" && \
	yes | yo moda --skip-install && \
	npm install && \
	bower install