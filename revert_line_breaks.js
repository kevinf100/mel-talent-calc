import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Get all class directories
function getClassDirs() {
    try {
        return fs.readdirSync(targetDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error(`❌ Error reading target directory: ${targetDir}`);
        console.error(error.message);
        return [];
    }
}

function revertLineBreaks() {
    console.log('🔄 REVERTING LINE BREAKS TO PROPER ESCAPE SEQUENCES');
    console.log(`📁 Target directory: ${targetDir}`);
    console.log('Converting actual newlines back to \\n escape sequences\n');
    console.log('='.repeat(60));

    const classDirs = getClassDirs();
    if (classDirs.length === 0) {
        console.log('❌ No class directories found!');
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let totalReplacements = 0;

    classDirs.forEach(className => {
        const classDir = path.join(targetDir, className);

        // Get all spec files (non-raw files)
        let specFiles;
        try {
            specFiles = fs.readdirSync(classDir)
                .filter(file => file.endsWith('.ts') && !file.startsWith('raw_'));
        } catch (error) {
            console.log(`❌ Error reading ${className} directory: ${error.message}`);
            errorCount++;
            return;
        }

        if (specFiles.length === 0) {
            return;
        }

        console.log(`\n${className.toUpperCase()}:`);

        specFiles.forEach(specFile => {
            const specName = specFile.replace('.ts', '');
            const specFilePath = path.join(classDir, specFile);

            try {
                // Read the existing TS file
                const originalContent = fs.readFileSync(specFilePath, 'utf8');
                
                // Check if it contains actual newlines within string literals
                // Look for patterns like "text\n (with actual newline) more text"
                const hasActualNewlines = originalContent.includes('"\n') || 
                                         originalContent.includes('\n"') ||
                                         originalContent.includes('.\n\n');
                
                if (!hasActualNewlines) {
                    console.log(`  ✅ ${specName}: No actual newlines found in strings`);
                    skippedCount++;
                    return;
                }

                // Replace actual newlines within strings with \\n escape sequences
                // This is a bit tricky - we need to find newlines that are inside string literals
                let updatedContent = originalContent;
                
                // Split by lines and process each line
                const lines = originalContent.split('\n');
                const processedLines = [];
                let insideString = false;
                let currentQuote = '';
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    
                    // Check if this line appears to be inside a string literal
                    // Look for lines that start with whitespace and end with a quote or comma
                    if (line.trim().startsWith('"') && !line.trim().endsWith('",') && !line.trim().endsWith('"')) {
                        // This line starts a multi-line string
                        insideString = true;
                        processedLines.push(line);
                    } else if (insideString && line.trim() === '') {
                        // Empty line inside a string - convert to \\n
                        processedLines[processedLines.length - 1] += '\\n\\n';
                        totalReplacements += 2;
                    } else if (insideString && line.trim().endsWith('"')) {
                        // This line ends the multi-line string
                        processedLines[processedLines.length - 1] += line.trim();
                        insideString = false;
                        totalReplacements++;
                    } else if (insideString) {
                        // Line inside a string - append to previous line with \\n
                        processedLines[processedLines.length - 1] += '\\n' + line.trim();
                        totalReplacements++;
                    } else {
                        // Normal line
                        processedLines.push(line);
                    }
                }
                
                updatedContent = processedLines.join('\n');

                // Write the updated file
                fs.writeFileSync(specFilePath, updatedContent);
                
                console.log(`  🔄 ${specName}: Reverted line breaks to escape sequences`);
                updatedCount++;

            } catch (error) {
                console.log(`  ❌ ${specName}: Error - ${error.message}`);
                errorCount++;
            }
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY:');
    console.log(`🔄 Files updated: ${updatedCount}`);
    console.log(`✅ Files with no issues: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total line breaks reverted: ${totalReplacements}`);
    console.log('='.repeat(60));
    
    if (updatedCount > 0) {
        console.log('\n🚀 SUCCESS: Line breaks reverted to proper escape sequences!');
        console.log('💡 Strings now use \\n escape sequences instead of actual newlines');
    }
}

// Execute the revert
revertLineBreaks();
